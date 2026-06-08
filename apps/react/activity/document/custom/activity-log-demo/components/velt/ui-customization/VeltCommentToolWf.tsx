"use client";
import { VeltCommentToolWireframe } from '@veltdev/react';

const VeltCommentToolWf = () => {
  return (
    <VeltCommentToolWireframe>
      <div className="custom-bubble-tool">
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M2.74463 15.008L3.64746 12.083C2.86717 10.8367 2.58489 9.36081 2.85312 7.92972C3.12135 6.49864 3.92183 5.20975 5.10573 4.3027C6.28962 3.39565 7.77637 2.93217 9.28954 2.99842C10.8027 3.06468 12.2393 3.65617 13.3323 4.66291C14.4252 5.66966 15.1002 7.02315 15.2316 8.47173C15.363 9.92032 14.9419 11.3654 14.0466 12.5383C13.1514 13.7113 11.8429 14.5322 10.3644 14.8485C8.88594 15.1648 7.33811 14.955 6.00872 14.258L2.74463 15.008Z"
            stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
    </VeltCommentToolWireframe>
  );
};

export default VeltCommentToolWf;
