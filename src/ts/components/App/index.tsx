import React, { useLayoutEffect, useState } from 'react';
import { THEME } from '../../constants';
import { waitFor } from '../../utils';
import { ExpandButton } from '../ExpandButton';
import Header from '../Header';
import Headings from '../Headings';
import { useFolded, useMaxheight } from './hooks';

export default function App() {
  const [theme, setTheme] = useState<Theme>(THEME.LIGHT);
  const [tocUpdatedAt, setTocUpdatedAt] = useState<number>(Date.now());
  const { folded, setFolded } = useFolded(false);
  const { maxHeight, setMaxHeight } = useMaxheight();

  // set theme
  useLayoutEffect(() => {
    (async () => {
      const elem = await waitFor('.notion-light-theme,.notion-dark-theme');
      setTheme(elem.matches('.notion-light-theme') ? THEME.LIGHT : THEME.DARK);
    })();
  }, []);

  return (
    <div className={`toc-container toc-theme-${theme}`}>
      <Header folded={folded} setFolded={setFolded} />
      {/* 閉じてる間も目次の描画の処理が走り続けるのはイマイチだが、、
          描画し続けていないと ExpandButton.folded の状態を保持し続けられないので。 */}
      <div {...(folded && { className: 'toc-hidden' })}>
        <Headings maxHeight={maxHeight} setTocUpdatedAt={setTocUpdatedAt} />
        <ExpandButton
          setMaxHeight={setMaxHeight}
          tocUpdatedAt={tocUpdatedAt}
          isContainerFolded={folded}
        />
      </div>
    </div>
  );
}
