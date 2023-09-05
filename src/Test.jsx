import { useRef, useState } from "react";
import FroalaEditorComponent from "react-froala-wysiwyg";
import "froala-editor/css/froala_editor.pkgd.min.css";
import "froala-editor/js/plugins.pkgd.min.js";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

const Test = () => {
  const [model, setModel] = useState("");
  const editorRef = useRef(null);

  const handleModelChange = (newModel) => {
    setModel(newModel);
  };

  //   function that converts froala data to pdf or image
  const downloadAsPDF = async () => {
    const tempElement = document.createElement("div"); //created new element to get data from froala (sending froala content to div)
    tempElement.innerHTML = model; //model is a state

    // used this to inject the tempElement to the body temporarily for the html2canvas capture
    document.body.appendChild(tempElement);

    // console.log(model);
    // console.log(editorRef.current.oldModel); we can also use this in place of usestate

    //creating canvas
    const canvas = await html2canvas(tempElement, {
      useCORS: true,
      allowTaint: false,
    });
    const quality = 0.7;
    const imageData = canvas.toDataURL("image/JPEG", quality); //image size can be handled using this quality property
    const pdf = new jsPDF("p", "mm", "a4");
    const pdfWidth = 210;
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
    pdf.addImage(imageData, "JPEG", 0, 0, pdfWidth, pdfHeight);
    pdf.save("Froala_Content.pdf");
    // used this to remove that tempElement from UI
    document.body.removeChild(tempElement);
  };

  return (
    <div>
      <button onClick={downloadAsPDF}>Download as PDF</button>
      <FroalaEditorComponent
        tag="textarea"
        onModelChange={handleModelChange}
        ref={editorRef}
        id="editor-container"
      />
      {/* doesn't work */}
      {/* <div id="test" style={{ display: "none" }}></div> */}
      <div id="test"></div>
    </div>
  );
};

export default Test;
