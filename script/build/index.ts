import delPath from '../utils/delpath';
import { series, parallel, src, dest } from 'gulp';
import { pkgPath, componentPath } from '../utils/paths';
import glupSass from 'gulp-sass';
import sassLang from 'sass';
import autoprefixer from 'gulp-autoprefixer';
import run from '../utils/run';

//删除dist
export const removeDist = () => {
  return delPath(`${pkgPath}/elong`);
};
const sass = glupSass(sassLang);

//打包样式
export const buildStyle = () => {
  return src(`${componentPath}/**/styles/**.scss`)
    .pipe(sass())
    .pipe(autoprefixer())
    .pipe(dest(`${pkgPath}/elong/lib/components/`))
    .pipe(dest(`${pkgPath}/elong/es/components/`));
};

//打包组件
export const buildComponent = async () => {
  run('pnpm run build', componentPath);
};
export default series(
  async () => removeDist(),
  parallel(
    async () => buildStyle(),
    async () => buildComponent()
  )
);
