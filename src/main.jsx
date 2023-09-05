// import React from 'react';
import ReactDOM from "react-dom";

// Require Editor CSS files.
import "froala-editor/css/froala_style.min.css";
import "froala-editor/css/froala_editor.pkgd.min.css";

// import FroalaEditorComponent from "react-froala-wysiwyg";
import Test from "./Test";

const root = ReactDOM.createRoot(document.getElementById("editor"));

root.render(<Test />);
