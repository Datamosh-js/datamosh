import { readFile } from 'fs/promises'
import datamosh from './lib/datamosh';

const sampleImagePath: string = './tests/fixtures/rgb.png';

(async () => {
    const src = await readFile(sampleImagePath)
    const result = await datamosh({ src })
})();