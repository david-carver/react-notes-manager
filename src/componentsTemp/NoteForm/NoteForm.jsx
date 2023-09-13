import { PencilFill, TrashFill } from "react-bootstrap-icons";
import s from "./NoteForm.module.css";
import ButtonPrimary from "componentsTemp/ButtonPrimary/ButtonPrimary";
import { useState } from "react";
import ValidatorService from "services/validator";
import FieldError from "componentsTemp/FieldError/FieldError";

const VALIDATOR = {
  title: (value) => {
    return ValidatorService.min(value, 3) || ValidatorService.max(value, 20);
  },
  content: (value) => {
    return ValidatorService.min(value, 3);
  },
};

export default function NoteForm({
  isEditable = true,
  title,
  onClickEdit,
  onClickDelete,
  onSubmit,
  note,
}) {
  const [formValues, setFormValues] = useState({
    title: note?.title || "",
    content: note?.content || "",
    ...(note && { id: note.id }),
  });
  const [formErrors, setFormErrors] = useState({
    title: note?.title ? undefined : true,
    content: note?.content ? undefined : true,
  });

  function validate(fieldName, fieldValue) {
    setFormErrors({
      ...formErrors,
      [fieldName]: VALIDATOR[fieldName](fieldValue),
    });
  }

  function updateFormValues(event) {
    const { name, value } = event.target;
    setFormValues({ ...formValues, [name]: value });
    validate(name, value);
  }

  const actionIcons = (
    <>
      {onClickEdit && (
        <div className="col-1">
          <PencilFill onClick={onClickEdit} className={s.icon} />
        </div>
      )}
      {onClickDelete && (
        <div className="col-1">
          <TrashFill onClick={onClickDelete} className={s.icon} />
        </div>
      )}
    </>
  );

  const titleInput = (
    <div className="mb-5">
      <label className="form-label">Title</label>
      <input
        onChange={updateFormValues}
        type="text"
        name="title"
        className="form-control"
        value={formValues.title}
      />
      <FieldError msg={formErrors.title} />
    </div>
  );

  const contentInput = (
    <div className="mb-5">
      <label className="form-label">Content</label>
      <textarea
        onChange={updateFormValues}
        type="text"
        name="content"
        className="form-control"
        row="5"
        value={formValues.content}
      />
      <FieldError msg={formErrors.content} />
    </div>
  );

  const submitBtn = (
    <>
      {isEditable && (
        <div className={s["submit-button"]}>
          <ButtonPrimary
            onClick={onSubmit?.bind(null, formValues)}
            isDisabled={Object.values(formErrors).some(
              (value) => value !== undefined
            )}
          >
            Submit
          </ButtonPrimary>
        </div>
      )}
    </>
  );

  return (
    <div className={s.container}>
      <div className="row justify-content-space-between">
        <div className="col-10">
          <h2 className="mb-3">{title}</h2>
        </div>
        {actionIcons}
      </div>
      <div className={`mb-3 ${s["title-input-container"]}`}>
        {isEditable && titleInput}
      </div>
      <div className="mb-3">
        {isEditable ? contentInput : <pre>{note.content}</pre>}
      </div>
      {onSubmit && submitBtn}
    </div>
  );
}
