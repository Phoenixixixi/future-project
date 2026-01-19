import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'

export default function LoginForm() {
  return (
    <div className="bg-white/30 backdrop-blur-lg shadow-lg shadow-white/40 flex flex-col justify-center px-12 md:px-32">
      <div className="text-center">
        <h1 className="text-4xl font-semibold text-blue-400 leading-8">
          Welcome back to Dust.
        </h1>
        <p className="text-md font-semibold text-blue-400/40 tracking-tighter mt-2">
          Everything you need, all in one place.
        </p>
      </div>
      <form action="" className="mt-16">
        <Label className={'text-md font text-blue-400'}>Email</Label>
        <Input
          type={'email'}
          placeholder="John@example.com"
          className={'mt-2'}
        />
        <Label className={'text-md font text-blue-400 mt-4'}>Password</Label>
        <Input type={'password'} placeholder="********" className={'mt-2'} />
        <div className="mt-8">
          <Button className={'bg-blue-500 w-full hover:bg-blue-300'}>
            Login
          </Button>
          <div className="flex items-center gap-4 my-6">
            <div className="flex-1 h-px bg-gray-300"></div>
            <span className="text-sm text-gray-400 font-medium">OR</span>
            <div className="flex-1 h-px bg-gray-300"></div>
          </div>
          <Button
            className={
              'border-blue-500 bg-white w-full border-1 text-blue-400 hover:text-blue-300 hover:bg-white'
            }
          >
            Sign Up
          </Button>
        </div>
      </form>
    </div>
  )
}
