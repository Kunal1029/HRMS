import React, { useState } from "react";
import WarningModal from "../../components/modal/WarningModal";

function CandidateAction({ text, title }) {
  const [isOpen, setIsOpen] = useState(false);

  const handleSubmit = ()=>{
    
    setIsOpen(false)
    
    setTimeout(()=>{
        alert("del success fully")
    },1000) 
  } 

  return (
    <div>
      <p onClick={() => setIsOpen(true)}>Delete</p>

      <WarningModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title={title}
        text={text}
        onSubmit={handleSubmit}
        extrabtn="Delete"
      />
    </div>
  );
}

export default CandidateAction;
