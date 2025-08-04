module.exports = {
    theme: {
        extend: {
            fontFamily: {
                sans: ['Inter', 'sans-serif'],
                display: ['Poppins', 'sans-serif'],
            },
            animation: {
                'wiggle-slow': 'wiggle 3s ease-in-out infinite',
                'bounce-slow': 'bounce 2s infinite',
                'ping-slow-once': 'ping-once 1s linear forwards',
                'fade-in-down': 'fadeInDown 0.8s ease-out forwards',
                'fade-in-up': 'fadeInUp 0.8s ease-out forwards 0.2s',
                'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
                'pulse-slow-delay': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite 0.5s',
            },
            keyframes: {
                wiggle: {
                    '0%, 100%': { transform: 'rotate(-3deg)' },
                    '50%': { transform: 'rotate(3deg)' },
                },
                'ping-once': {
                    '0%': { transform: 'scale(1)', opacity: '1' },
                    '50%': { transform: 'scale(1.5)', opacity: '0.5' },
                    '100%': { transform: 'scale(1)', opacity: '1' },
                },
                fadeInDown: {
                    '0%': { opacity: '0', transform: 'translateY(-20px)' },
                    '100%': { opacity: '1', transform: 'translateY(0)' },
                },
                fadeInUp: {
                    '0%': { opacity: '0', transform: 'translateY(20px)' },
                    '100%': { opacity: '1', transform: 'translateY(0)' },
                }
            }
        }
    },
    plugins: [],
};