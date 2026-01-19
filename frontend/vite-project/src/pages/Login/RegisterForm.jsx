import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { registerService } from '@/services/authServices'
import { useAlert } from '@/context/alertContext'
import { useNavigate } from 'react-router-dom'

export default function RegisterForm() {
  const navigate = useNavigate()
  const { showAlert } = useAlert()
  const handleSubmit = async (e) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const name = formData.get('name')
    const password = formData.get('password')
    const email = formData.get('email')
    const confirmPassword = formData.get('confirmPassword')

    if (password !== confirmPassword) {
      showAlert("your password doesn't match", 'failed', 'Password Failed')
      return
    }

    try {
      const result = await registerService(email, password, name)
      console.log(result)

      showAlert(result.message, 'success', 'Success')
      setTimeout(() => navigate('/sign'), 3000)
    } catch (err) {
      showAlert(err.message, 'failed', 'Failed')
      console.error(err)
    }
  }
  return (
    <div className="bg-white/30 backdrop-blur-lg shadow-lg shadow-white/40 flex flex-col justify-center px-12 md:px-32 xl:px-42 2xl:px-62">
      <div className="text-center">
        <h1 className="text-4xl font-semibold text-blue-400 leading-8">
          Sign Up it's Free
        </h1>
        <p className="text-md font-semibold text-blue-400/40 tracking-tighter mt-2">
          Everything you need, all in one place.
        </p>
      </div>
      <form onSubmit={handleSubmit} className="mt-16">
        <Label className={'text-md font text-blue-400'}>Name</Label>
        <Input
          name={'name'}
          type={'text'}
          placeholder="John Doe"
          className={'mt-2'}
        />
        <Label className={'text-md font text-blue-400 mt-4'}>Email</Label>
        <Input
          name={'email'}
          type={'email'}
          placeholder="John@example.com"
          className={'mt-2'}
        />
        <Label className={'text-md font text-blue-400 mt-4'}>Password</Label>
        <Input
          name={'password'}
          type={'password'}
          placeholder="********"
          className={'mt-2'}
        />
        <Label className={'text-md font text-blue-400 mt-4'}>
          Confirm Your Password
        </Label>
        <Input
          type={'password'}
          placeholder="********"
          className={'mt-2'}
          name={'confirmPassword'}
        />
        <div className="mt-8">
          <Button
            className={'bg-blue-500 w-full hover:bg-blue-300'}
            type="submit"
          >
            Sign Up
          </Button>
          <div className="flex items-center gap-4 my-6">
            <div className="flex-1 h-px bg-gray-300"></div>
            <span className="text-sm text-gray-400 font-medium">
              arleady account ?{' '}
            </span>
            <div className="flex-1 h-px bg-gray-300"></div>
          </div>
          <Button
            className={
              'border-blue-500 bg-white w-full border-1 text-blue-400 hover:text-blue-300 hover:bg-white'
            }
            onClick={() => navigate('/sign')}
            type={'button'}
          >
            Log in
          </Button>
        </div>
      </form>
    </div>
  )
}
