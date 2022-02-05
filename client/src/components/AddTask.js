import { useState } from 'react'

const AddTask = ({ onAdd }) => {
  const [text, setText] = useState('')
  const [day, setDay] = useState('')
  const [reminder, setReminder] = useState(false)

  const onSubmit = (e) => {
    e.preventDefault()

    if(!text & !day) {
      alert('Please fill empty fields')
      return
    }
    
    if(!text) {
      alert('please add task')
      return
    }
    
    if(!day) {
      alert('please add date and duration')
      return
    }

    onAdd( {text, day, reminder} )

    setText('')
    setDay('')
    setReminder(false)
  }

  return (
    <form className='add-form' onSubmit={onSubmit}>
      <div className='form-control'>
        <label>Reason</label>
        <input type='text' placeholder='Why am I meditating?' value={text}
        onChange={(e) => setText(e.target.value)} />
      </div>
      <div className='form-control'>
        <label>Day & Time</label>
        <input type='text' placeholder='Date & Duration' value={day}
        onChange={(e) => setDay(e.target.value)}/>
      </div>
      <div className='form-control form-control-check'>
        <label>Improvement?</label>
        <input type='checkbox' checked={reminder} value={reminder}
        onChange={(e) => setReminder(e.currentTarget.checked)}/>
      </div>

      <input type='submit' value='Save Task' className='btn btn-block'/>
    </form>
  )
}

export default AddTask
