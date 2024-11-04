// components/Shapes.jsx
import { motion } from "framer-motion";

export const Shapes = ({ isHover, isPress, mouseX, mouseY }) => {
    return (
        <motion.div
            style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                translateX: mouseX,
                translateY: mouseY,
            }}
        >
            {/* Aquí puedes añadir tus formas o gráficos */}
            <motion.div className="shape" style={{ width: 100, height: 100, backgroundColor: 'red' }} />
        </motion.div>
    );
};
