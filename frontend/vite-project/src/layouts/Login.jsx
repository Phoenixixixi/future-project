import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Outlet } from 'react-router-dom'

export default function Login() {
  return (
    <div className="w-dvw h-dvh">
      <div className="h-full">
        <div className="grid md:grid-cols-[40%_56%] gap-x-4 h-full">
          <div className="hidden md:flex bg-[url(/ryoji-iwata-X53e51WfjlE-unsplash.jpg)] bg-center bg-cover flex-col justify-end p-4 py-14 relative">
            <div
              className="absolute inset-0 
                  bg-gradient-to-t 
                  from-black/80 via-black/30 to-transparent w-full"
            />
            <div className="z-20">
              <p className="text-white text-3xl font-semibold leading-12">
                "In an era that demands speed, we deliver precision."
              </p>
              <p className="text-md text-white font-semibold mt-8">Dustin</p>
              <p className="text-[.8rem] text-white font-normal">
                Web Developer Ethusiast.
              </p>
            </div>
          </div>
          <Outlet />
        </div>
      </div>
    </div>
  )
}
