import { useInViewport } from "ahooks";
import React from "react";
import {
  SectionName,
  useActiveSectionContext,
} from "~/components/active-section";

export function useSectionInView(
  sectionName: SectionName,
  ref: React.MutableRefObject<null>
) {
  const { setActiveSection, timeOfLastClick } = useActiveSectionContext();

  useInViewport(ref, {
    threshold: 0.75,
    callback: (entry) => {
      const inView = entry.isIntersecting;
      if (inView && Date.now() - timeOfLastClick > 1000) {
        setActiveSection(sectionName);
      }
    },
  });
}
