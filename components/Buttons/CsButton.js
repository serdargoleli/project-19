import { Button } from "primereact/button";
import React, { useEffect, useState } from "react";

/**
 * @typedef {"primary" | "secondary" | "add" | "delete" | "edit" | "save" |"outlinePrimary"} type
 */

/**
 * @typedef {"submit" | "button" | "reset" } buttonType
 */

/**
 * @typedef {"left" | "right"  } iconPosition
 */


/**
 * @param {{
 *  isView: boolean,
 *  onClick: () => void,
 *  disabled?: boolean,
 *  children?: React.ReactNode,
 *  loading?: boolean,
 *  type?: type
 *  label:string
 *  classname:string,
 *  buttonType:buttonType
 *  icon: ReactDOM,
 *  iconPosition: iconPosition
 * }} props
 */

const CsButton = ({
                    isView = true,
                    onClick,
                    disabled,
                    children,
                    loading,
                    type,
                    label,
                    classname,
                    buttonType,
                    outlined,
                    iconPosition
                  }) => {
  const [isClient, setIsClient] = useState(false);
  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null;
  }

  if (isView) {
    const types = {
      primary: "btn btn-primary",
      secondary: "btn btn-secondary",
      add: "btn btn-add",
      delete: "btn btn-delete",
      edit: "btn btn-edit",
      save: "btn btn-save",
      outlinePrimary: "btn outline-primary"
    };

    const className = types[type] || types["primary"];

    let updatedClassName = className + " " + classname;
    return (
      <Button onClick={onClick} type={buttonType} disabled={disabled} outlined={outlined ? outlined : false}
              loading={loading} className={updatedClassName}>
        {iconPosition === "left" && children}
        {iconPosition !== "left" && iconPosition !== "right" && children}
        <span> {label}</span>
        {iconPosition === "right" && children}
      </Button>);
  }
  return null;
};

export default CsButton;
