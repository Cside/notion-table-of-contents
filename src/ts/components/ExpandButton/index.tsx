import React, { useEffect, useState } from 'react';
import { throttle } from 'throttle-debounce';
import { THROTTLE_TIME } from '../../constants';
import { useMaxheight } from '../App/hooks';
import { FoldIcon } from '../FoldIcon';
import { useHasScrollBar } from './hooks';

export const ExpandButton = ({
  pageLoadedAt,
  tocUpdatedAt,
  setMaxHeight,
}: {
  pageLoadedAt: number;
  tocUpdatedAt: number;
  setMaxHeight: ReturnType<typeof useMaxheight>['setMaxHeight'];
}) => {
  const { hasScrollbar, setHasScrollbar } = useHasScrollBar();
  const [folded, setFolded] = useState(true);

  // set hasScrollbar
  useEffect(() => {
    const fn = throttle(setHasScrollbar, THROTTLE_TIME);
    window.addEventListener('resize', fn);
    return () => window.removeEventListener('resize', fn);
  }, []);
  useEffect(() => {
    setHasScrollbar(); // setTocUpdatedAt する側で throttle してるので、ここでは間引かない
  }, [tocUpdatedAt]);

  // ページ遷移したら閉じる
  // 本来は上層にリフトアップしたほうが再描画しなくて済むのだろうが ...
  // setFolded はこのコンポーネントで完結させたいので今のところはやらない
  useEffect(() => {
    setFolded(true);
    setMaxHeight(({ defaultVal }) => defaultVal);
  }, [pageLoadedAt]);

  return !folded || hasScrollbar ? (
    <div
      className="toc-expand-button"
      onClick={() => {
        setFolded(!folded);
        setMaxHeight(({ defaultVal, expanded }) =>
          folded ? expanded : defaultVal,
        );
      }}
    >
      <FoldIcon direction={folded ? 'down' : 'up'} />
    </div>
  ) : null;
};
