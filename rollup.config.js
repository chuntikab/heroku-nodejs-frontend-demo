import {nodeResolve} from '@rollup/plugin-node-resolve';
import {babel} from '@rollup/plugin-babel';
import lwc from '@lwc/rollup-plugin';
import replace from '@rollup/plugin-replace';

export default {

	/** LWC */
	input: 'src/main.js',

    output: {
        file: 'dist/main.js',
        format: 'esm',
    },

    plugins: [
        replace({
            'process.env.NODE_ENV': JSON.stringify('development'),
        }),
        lwc(),
    ],

	/** Node.js Front-end */
	// input: './js/main.js',
	// output: {
	// 	file: './public/js/main.js',
	// 	name: 'bundle',
	// 	format: 'iife',
	// 	sourcemap: true
	// },
	// plugins: [
	// 	nodeResolve(),
	// 	babel({
	// 		babelHelpers: 'bundled' 
	// 	})
	// ]
};
