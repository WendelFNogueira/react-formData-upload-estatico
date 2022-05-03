import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const currentDir = dirname(fileURLToPath(import.meta.url));
const root = join( currentDir, '../../' );
const publicDir = join( root, 'public' );
const distDir = join( root, 'dist' );

export default {
    dir: {
        root,
        publicDir,
        distDir,
    },
}
