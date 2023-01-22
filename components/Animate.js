import { motion } from "framer-motion"

export default function Animate({ children }) {
    return (
        <motion.div
            initial={{ y: 0, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 0, opacity: 0 }}
            transition={{ type: "spring", stiffness: 100}}
        >
            {children}
        </motion.div>
    )
}