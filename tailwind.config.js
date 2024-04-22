module.exports = {
  content: ['./src/**/*.{html,ts}'],
  theme: {
    extend: {
      fontSize: {
        xs: 14,
        sm: 16,
        md: 18,
        lg: 20,
        xl: 24,
      },

      colors: {
        pantone: '#5b4349',
        stone: '#202024',
        orange: '#fv923c',
        'medium-purple': '#c4c4cc',
        turbo: '#facc15',
        malibu: '#54c1E9',
        'space-shuttle': '#44403c',
        'neon-carrot': '#Fb923c',
      },

      extend: {
        fontFamily: {
          sans: 'Inter ,sans-serif',
        },
      },
    },
  },
  plugins: [],
};
