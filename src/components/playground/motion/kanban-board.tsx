"use client";
import React, {
  Dispatch,
  DragEvent,
  FormEvent,
  SetStateAction,
  useState,
} from "react";
import { motion } from "motion/react";
import MotionPlaygroundContainer from "./container";
import { cn } from "~/lib/utils";
import { FaFire, FaTrash } from "react-icons/fa";
import { Button } from "~/components/ui/button";
import { Plus } from "lucide-react";
import { Textarea } from "~/components/ui/textarea";

export const KanbanBoard = () => {
  return (
    <MotionPlaygroundContainer className="w-[1400px]">
      <Board />
    </MotionPlaygroundContainer>
  );
};

const Board = () => {
  const [cards, setCards] = useState<CardType[]>(DEFAULT_CARDS);

  return (
    <div className="flex h-full w-full gap-3 overflow-scroll p-12 bg-slate-900 custom-scrollbar">
      <Column
        title="Backlog"
        column="backlog"
        headingColor="text-neutral-500"
        cards={cards}
        setCards={setCards}
      />
      <Column
        title="TODO"
        column="todo"
        headingColor="text-yellow-200"
        cards={cards}
        setCards={setCards}
      />
      <Column
        title="In progress"
        column="doing"
        headingColor="text-blue-200"
        cards={cards}
        setCards={setCards}
      />
      <Column
        title="Complete"
        column="done"
        headingColor="text-emerald-200"
        cards={cards}
        setCards={setCards}
      />
      <DeleteArea setCards={setCards} />
    </div>
  );
};

type ColumnType = "backlog" | "todo" | "doing" | "done";

type CardType = {
  title: string;
  id: string;
  column: ColumnType;
};

type ColumnProps = {
  title: string;
  headingColor: string;
  cards: CardType[];
  column: ColumnType;
  setCards: Dispatch<SetStateAction<CardType[]>>;
};

const Column = ({
  title,
  headingColor,
  column,
  cards,
  setCards,
}: ColumnProps) => {
  const [active, setActive] = useState(false);

  const getAllIndicators = () => {
    const doms = document.querySelectorAll(
      `[data-column=${column}]`
    ) as unknown as HTMLElement[];

    return Array.from(doms);
  };

  const clearHighlights = (elements?: HTMLElement[]) => {
    const indicators = elements || getAllIndicators();
    indicators.forEach((i) => (i.style.opacity = "0"));
  };

  const getNearestIndicator = (e: DragEvent, elements: HTMLElement[]) => {
    const el = elements.reduce(
      (closest, current) => {
        const currentRect = current.getBoundingClientRect();

        const offset = e.clientY - (currentRect.top + 50);

        if (offset <= 0 && offset > closest.offset) {
          return {
            offset,
            element: current,
          };
        } else {
          return closest;
        }
      },
      {
        offset: Number.NEGATIVE_INFINITY,
        element: elements[elements.length - 1],
      }
    );

    return el;
  };

  const highlightIndicator = (e: DragEvent) => {
    const indicators = getAllIndicators();

    clearHighlights(indicators);
    const highlightEl = getNearestIndicator(e, indicators);

    highlightEl.element.style.opacity = "1";
  };

  const handleDragStart = (e: DragEvent, card: CardType) => {
    e.dataTransfer.setData("cardId", card.id);
  };

  const handleDragOver = (e: DragEvent) => {
    e.preventDefault();
    highlightIndicator(e);
    setActive(true);
  };

  const handleDragEnd = (e: DragEvent) => {
    const cardId = e.dataTransfer.getData("cardId");
    console.log(cardId);

    setActive(false);
    clearHighlights();

    const indicators = getAllIndicators();
    const { element } = getNearestIndicator(e, indicators);

    const before = element.dataset.before || "-1";
    if (before !== cardId) {
      let copy = [...cards];
      let cardToTransfer = copy.find((c) => c.id === cardId);
      if (!cardToTransfer) return;
      cardToTransfer = { ...cardToTransfer, column };
      copy = copy.filter((c) => c.id !== cardId);

      if (before === "-1") {
        copy.push(cardToTransfer);
      } else {
        const insertIndex = copy.findIndex((el) => el.id === before);
        if (!insertIndex) return;
        copy.splice(insertIndex, 0, cardToTransfer);
      }

      setCards(copy);
    }
  };

  const handleDragLeave = () => {
    clearHighlights();
    setActive(false);
  };

  const filteredCards = cards.filter((c) => c.column === column);

  return (
    <div className="w-56 shrink-0">
      <div className="mb-3 flex items-center">
        <h3 className={`font-medium ${headingColor}`}>{title}</h3>
        <span className="rounded text-sm text-neutral-400 pl-2">
          ({filteredCards.length})
        </span>
      </div>
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDragEnd}
        className={`h-full w-full transition-colors ${
          active ? "bg-neutral-800/50" : "bg-neutral-800/0"
        }`}
      >
        {filteredCards.map((c) => (
          <Card key={c.id} {...c} handleDragStart={handleDragStart} />
        ))}
        <DropIndicator beforeId="-1" column={column} />
        <AddCard column={column} setCards={setCards} />
      </div>
    </div>
  );
};

type CardProps = CardType & {
  handleDragStart: Function;
};

const Card = ({ title, id, column, handleDragStart }: CardProps) => {
  return (
    <>
      <DropIndicator beforeId={id} column={column} />
      <motion.div
        layout
        layoutId={id}
        draggable="true"
        onDragStart={(e) => handleDragStart(e, { title, id, column })}
        className="cursor-grab rounded border border-neutral-700 bg-neutral-800 p-3 active:cursor-grabbing"
      >
        <p className="text-sm text-neutral-100">{title}</p>
      </motion.div>
    </>
  );
};

type DropIndicatorProps = {
  beforeId: string;
  column: ColumnType;
};

const DropIndicator = ({ beforeId, column }: DropIndicatorProps) => {
  return (
    <div
      data-before={beforeId || "-1"}
      data-column={column}
      className="my-0.5 h-0.5 w-full bg-violet-400 opacity-0"
    />
  );
};

const DeleteArea = ({
  setCards,
}: {
  setCards: Dispatch<SetStateAction<CardType[]>>;
}) => {
  const [active, setActive] = useState(false);

  const handleDragOver = (e: DragEvent) => {
    e.preventDefault();
    setActive(true);
  };

  const handleDragLeave = () => {
    setActive(false);
  };

  const handleDragEnd = (e: DragEvent) => {
    const cardId = e.dataTransfer.getData("cardId");

    setCards((prev) => prev.filter((c) => c.id !== cardId));

    setActive(false);
  };

  return (
    <div
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDragEnd}
      className={cn(
        `mt-10 grid h-56 w-56 shrink-0 place-content-center rounded border text-3xl`,
        active
          ? "border-red-800 bg-red-800/20 text-red-500"
          : "border-neutral-500 bg-neutral-500/20 text-neutral-500"
      )}
    >
      {active ? <FaFire className="animate-bounce" /> : <FaTrash />}
    </div>
  );
};

const AddCard = ({
  setCards,
  column,
}: {
  column: ColumnType;
  setCards: Dispatch<SetStateAction<CardType[]>>;
}) => {
  const [text, setText] = useState("");
  const [adding, setAdding] = useState(false);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!text.trim().length) return;

    const newCard = {
      column,
      title: text.trim(),
      id: Math.random().toString(),
    };

    setCards((prev) => [...prev, newCard]);
    setAdding(false);
  };

  return (
    <>
      {adding ? (
        <motion.form layout onSubmit={handleSubmit}>
          <Textarea
            placeholder="Add new task..."
            autoFocus
            onChange={(e) => setText(e.target.value)}
            className="text-neutral-50"
          />
          <motion.div
            layout
            className="mt-1.5 flex items-center justify-end gap-1.5"
          >
            <Button onClick={() => setAdding(false)} variant="outline">
              Close
            </Button>
            <Button onClick={() => setAdding(false)} type="submit">
              Add <Plus size={16} />
            </Button>
          </motion.div>
        </motion.form>
      ) : (
        <motion.button
          layout
          onClick={() => setAdding(true)}
          className="flex w-full items-center gap-1.5 px-3 py-1.5 text-xs text-neutral-400 transition-colors hover:text-neutral-50"
        >
          <span>Add Card</span>
          <Plus size={16} />
        </motion.button>
      )}
    </>
  );
};

const DEFAULT_CARDS: CardType[] = [
  // BACKLOG
  { title: "Look into render bug in dashboard", id: "1", column: "backlog" },
  { title: "SOX compliance checklist", id: "2", column: "backlog" },
  { title: "[SPIKE] Migrate to Azure", id: "3", column: "backlog" },
  { title: "Document Notifications service", id: "4", column: "backlog" },
  // TODO
  {
    title: "Research DB options for new microservice",
    id: "5",
    column: "todo",
  },
  { title: "Postmortem for outage", id: "6", column: "todo" },
  { title: "Sync with product on Q3 roadmap", id: "7", column: "todo" },

  // DOING
  {
    title: "Refactor context providers to use Zustand",
    id: "8",
    column: "doing",
  },
  { title: "Add logging to daily CRON", id: "9", column: "doing" },
  // DONE
  {
    title: "Set up DD dashboards for Lambda listener",
    id: "10",
    column: "done",
  },
];
