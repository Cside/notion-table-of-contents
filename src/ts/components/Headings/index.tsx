import React from 'react';
import Heading from '../Heading';
import { useHeadings } from './hooks';

// MEMO: 描画コストが高いので、useMemo したほうが良さそう ... に一見思われるが
//       重い処理は useEffect でしか行われないので問題ない
export default function Headings({
  pageChangedTime,
  maxHeight,
}: {
  pageChangedTime: number;
  maxHeight: string;
}) {
  const headings = useHeadings({ pageChangedTime });

  return headings.length > 0 ? (
    <div className="toc-headings" style={{ maxHeight }}>
      {headings.map((heading) => (
        <Heading key={heading.blockId} {...heading} />
      ))}
    </div>
  ) : (
    <p className="toc-no-headings">{chrome.i18n.getMessage('NO_HEADINGS')}</p>
  );
}
