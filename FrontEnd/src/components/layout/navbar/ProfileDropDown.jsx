import React from "react";
import EditProfileModal from "../../../pages/auth/EditProfileModal";
import "./Nav.css";

function ProfileDropDown({ cls }) {
  const lis = [
    {
      name: "Edit profile",
      fields: [
        {
          name: "fullName",
          label: "Full Name",
          type: "text",
          placeholder: "Enter full name*",
          required: true,
        },
        {
          name: "email",
          label: "Email Address",
          type: "email",
          placeholder: "Enter email",
          required: true,
        },
        {
          name: "phone",
          label: "Phone Number",
          type: "text",
          placeholder: "Enter phone*",
          required: true,
        },
        {
          name: "Picture",
          label: "profile picture",
            // type: "file",
          type: "text",
          placeholder: "Upload Pics",
          required: true,
        },
      ],
      anyLinks: [
        {
          title: "Forget Password?",
          link: "click here",
        },
      ],
    },
    {
      name: "Change Password",
      fields: [
        {
          name: "previousPassword",
          label: "Previous Password",
          type: "password",
          placeholder: "Enter previous password",
          required: true,
        },
        {
          name: "newPassword",
          label: "New Password",
          type: "password",
          placeholder: "Enter New Password",
          required: true,
        },
        
      ],
      anyLinks: [
        {
          title: "Forget Password?",
          link: "click here",
        }, 
      ],
    },
    {
      name: "Manage Notification",
      fields: [
        {
          name: "deleteNotification",
          label: "Delete Notification",
          type: "radio",
          placeholder: "",
          required: false,
        },
        {
          name: "showAllNotification",
          label: "Show Notification",
          type: "radio",
          //   placeholder: "Enter email",
          required: false,
        },
        {
          name: "sendToMail",
          label: "Allow Send notification to your mail",
          type: "radio",
          //   placeholder: "Enter phone",
          required: false,
        },
      ],
    },
  ];
  return (
    <div>
      <ul className={cls}>
        {lis.map((x, i) => (
          <li key={i}>
            <EditProfileModal text={x.name} editFields={x.fields} anyLinks={x.anyLinks? x.anyLinks : []} />
          </li>
        ))}
      </ul>
    </div>
  );
}
//  <EditProfileModal text="Edit Profile" />

export default ProfileDropDown;
