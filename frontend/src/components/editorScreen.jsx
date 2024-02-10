import React from "react";
import { createRoot } from "react-dom/client";
import { Editor } from "@tinymce/tinymce-react";

export default function EditorScreen() {
  return (
    <Editor
      // Replace 'no-api-key' below with your API key
      apiKey="m98ujtsy84erfspj03kekdz5i06sap9h0r1jshnqrb1dtj02"
      init={{
        plugins:
          "ai autolink tinycomments mentions anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount checklist mediaembed casechange export formatpainter pageembed permanentpen footnotes advtemplate advtable advcode editimage tableofcontents mergetags powerpaste tinymcespellchecker autocorrect a11ychecker typography inlinecss",
        toolbar:
          "undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table mergetags | align lineheight | tinycomments | checklist numlist bullist indent outdent | emoticons charmap | removeformat",
        tinycomments_mode: "embedded",
        tinycomments_author: "Author name",
        mergetags_list: [
          { value: "First.Name", title: "First Name" },
          { value: "Email", title: "Email" },
        ],
        ai_request: (request, respondWith) =>
          respondWith.string(() =>
            Promise.reject("See docs to implement AI Assistant")
          ),
      }}
      initialValue="Welcome to TinyMCE!"
    />
  );
}
