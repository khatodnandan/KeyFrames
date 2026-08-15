import { useEffect } from "react";

const SITE_NAME = "Keyframes Media";

export default function useDocumentTitle(title, description) {
  useEffect(() => {
    document.title = title ? `${title} | ${SITE_NAME}` : SITE_NAME;

    if (description) {
      let meta = document.querySelector('meta[name="description"]');
      if (!meta) {
        meta = document.createElement("meta");
        meta.setAttribute("name", "description");
        document.head.appendChild(meta);
      }
      const previous = meta.getAttribute("content");
      meta.setAttribute("content", description);
      return () => {
        if (previous) meta.setAttribute("content", previous);
      };
    }
  }, [title, description]);
}
