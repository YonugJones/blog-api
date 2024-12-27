export default function Contact() {
  return (
    <div className='contact'>
      <h2>Contact Me!</h2>
      <p>I&apos;d love to hear from you! Feel free to reach out using the form below.</p>
      <form>
        <label htmlFor='name'>Name:</label>
        <input type='text' id='name' name='name' placeholder='Your name' required />

        <label htmlFor='email'>Email:</label>
        <input type='email' id='email' name='email' placeholder='Your email' required />

        <label htmlFor='message'>Message:</label>
        <textarea id='message' name='message' placeholder='Your message' required></textarea>

        <button type='submit'>Send</button>
      </form>
    </div>
  )
}