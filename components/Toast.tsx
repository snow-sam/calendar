import { LoaderCircle, X } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';

type ToastProps = {
    type: "loading" | "error"
} 

const mapToastMessage = new Map([
    ["loading", {icon: <LoaderCircle className='animate-spin' size={16} />, msg: "Loading tasks..."}],
    ["error", {icon: <X size={16} />, msg: "Tasks not available"}],
])

export const Toast = ({ type }: ToastProps) => {
    const params = mapToastMessage.get(type)
    return (
        <AnimatePresence>
            <motion.div initial={{ scale: 0, translateX: "50%" }} animate={{ scale: 1 }} exit={{ scale: 0 }} className='absolute bottom-4 right-1/2 flex gap-2 text-sm items-center bg-neutral-900 border border-neutral-800 shadow-sm p-2 px-4 rounded-md w-fit'>
                {params?.icon}
                {params?.msg}
            </motion.div>
        </AnimatePresence>
    )
}