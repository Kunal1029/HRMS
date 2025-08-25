import { useState } from "react";
import FormModal from "../../components/modal/FormModal";

function EditProfileModal({ text, editFields, anyLinks }) {
  const [isOpen, setIsOpen] = useState(false);

  const handleSubmit = (data) => {
    console.log("edit Data:", data);
  };

  return (
    <> 
      <p onClick={() => setIsOpen(true)}>{text}</p>

      <FormModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title={`${text}`}
        fields={editFields}
        onSubmit={handleSubmit}
        btnText={`${text} details`}
        anylinks={anyLinks}
        initialData={{s:"hi"}} //send user data
      />
    </>
  );
}

export default EditProfileModal;
