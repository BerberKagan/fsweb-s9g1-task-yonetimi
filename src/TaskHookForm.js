import React from 'react'
import { useForm } from 'react-hook-form'
import { nanoid } from "nanoid";
import { notify } from './App';

export default function TaskHookForm({ kisiler, submitFn, tasks }) {

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
  } = useForm({
    mode: "all",
    defaultValues: {
      title: "",
      description: "",
      people: []
    }
  });

  const createNewTask = (data) => {
    submitFn({
      ...data,
      id: nanoid(5),
      status: "yapılacak",
    });
    reset();
    notify(`${data.title} görevi eklendi`)
    console.log(data);
  }

  return (
    <div>
      <form className="taskForm" onSubmit={handleSubmit(createNewTask)}>

        <div className="form-line">
          <label className='input-label' htmlFor='title'>Title</label>
          <input className='input-text'
            name='title'
            id="title"
            type='text'
            {...register("title", {
              required: "Başlık boş bırakılamaz.",
              minLength: {
                value: 3,
                message: "Başlık en az 3 karakterden oluşmalıdır."
              }
            })}
          />
          {errors.title && <p>{errors.title.message}</p>}<br />
        </div>

        <div className="form-line">
          <label className='input-label' htmlFor='description'>Description</label>
          <textarea className='input-textarea'
            rows="3"
            id="description"
            name="description"
            {...register("description", {
              required: "Açıklama boş bırakılamaz",
              minLength: {
                value: 10,
                message: "Açıklama en az 10 karakter içermelidir."
              }
            })}
          >
          </textarea>
          {errors.description && <p>{errors.description.message}</p>}<br />
        </div>

        <div className='form-line'>
          <label className='input-label'>People</label>
          <div>
            {kisiler.map((e) => (
              <label className="input-checkbox" key={e}>
                <input
                  type="checkbox"
                  id="checkbox"
                  name="people"
                  value={e}
                  {...register('people', {
                    required: "Lütfen en az 1 kişi seçiniz.",
                    validate: {
                      maxLimit: (kisiler) =>
                        kisiler.length <= 3 || "En fazla 3 kişi seçebilirsiniz.",
                    }
                  })}
                />
                {e}
              </label>
            ))}
            {errors.people && <p>{errors.people.message}</p>}
          </div >

          <div className="form-line">
            <button type="submit" className='submit-button' disabled={!isValid}>Kaydet</button>
          </div>
        </div>
      </form>
    </div>
  )
}
