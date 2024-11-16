import React, { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export const PasteInput = ({onChange}: {onChange:(text:string) => any}) => {
    const [text, setText] = useState('')
    const cb = (text:string) => {
        setText(text)
        onChange(text)
    }
    
    return (
        <div className="grid w-full max-w-sm items-center gap-1.5">
            <div className="flex items-center space-x-2">
                <Input type="text" id="text" placeholder="Trustee Wallet Address" value={text} onChange={e => cb(e.currentTarget.value)}/>
                <Button
                    type="button"
                    onClick={async () => {
                        const text = await navigator.clipboard.readText()
                        cb(text)
                    }}
                >
                    <CopyIcon className="h-4 w-4" />
                    <span className="sr-only">Paste</span>
                </Button>
            </div>
        </div>
    )
}

function CopyIcon(props: any) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
            <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
        </svg>
    )
}