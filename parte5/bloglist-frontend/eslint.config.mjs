import globals from 'globals'
import stylisticJs from '@stylistic/eslint-plugin-js'
import js from '@eslint/js'

export default [
  js.configs.recommended,
  {
    files: ['**/*.js'],
    languageOptions: {
      sourceType: 'module',
      globals: {
        ...globals.node,
      },
      ecmaVersion: 'latest',
    },
    plugins: {
      '@stylistic/js': stylisticJs
    },
    rules: {
      // Eliminar puntos y comas
      '@stylistic/js/semi': [
        'error',
        'never'
      ],

      // Indentación de 2 espacios
      '@stylistic/js/indent': [
        'error',
        2
      ],

      // Estilo de salto de línea (Unix)
      '@stylistic/js/linebreak-style': [
        'error',
        'unix'
      ],

      // Comillas simples
      '@stylistic/js/quotes': [
        'error',
        'single'
      ],

      // Espacios dentro de llaves
      '@stylistic/js/object-curly-spacing': [
        'error',
        'always'
      ],

      // No se permiten espacios al final de líneas
      'no-trailing-spaces': 'error',

      // Espacios en funciones de flecha
      '@stylistic/js/arrow-spacing': [
        'error', { 'before': true, 'after': true },
      ],

      // Usar estrictamente igualdad estricta
      'eqeqeq': 'error',

      // Permitir console.log (puedes quitarlo si prefieres)
      'no-console': 'off',
    },
  },
  {
    // Ignorar archivos generados
    ignores: ['dist/**', 'build/**'],
  },
]
