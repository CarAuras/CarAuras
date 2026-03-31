import { compareAsc, format as formatDateFns, parseISO } from "date-fns";

export const formatDate = (date, dateFormat) => {
  if (!date) return "";
  const parsedDate = parseISO(date);
  return formatDateFns(parsedDate, dateFormat);
};

export const formatViews = (view) => {
  if (view > 999 && view < 99999) {
    return `${view} k`;
  } else if (view >= 100000 && view < 999999) {
    return `${view} Lakh`;
  } else if (view > 999999 && view < 9999999) {
    return `${view} M`;
  } else if (view > 10000000) {
    return `${view} Cr`;
  } else {
    return view;
  }
};

export const convertContentfullResponse = async (resp) => {
  const formattedResponse = [];

  if (resp.length > 0) {
    console.log("RESP----------------", resp);
    resp.forEach((item, index) => {
      const entry = {
        id: index + 1,
        slug: item.fields.title
          ?.toLowerCase()
          .replace(/\s+/g, "-")
          .replace(/[^\w-]+/g, ""),
        category: item.fields.category || "Demo",
        title: item.fields.title,
        date: new Date(item.fields.date).toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        }),
        image: item.fields.image?.fields?.file?.url || "",
        alt: item.fields.title?.toLowerCase().replace(/\s+/g, " "),
        sections:
          item.fields.sections?.map((section) => ({
            content: section,
          })) || [],
        description:
          item?.fields?.description?.content[0]?.content[0]?.value ?? "test",
      };

      formattedResponse.push(entry);
    });
  }

  return formattedResponse;
};
