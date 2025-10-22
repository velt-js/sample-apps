import React from 'react';

// Figma asset URLs from localhost:3845
const imgBeam = "http://localhost:3845/assets/1dca580172205bd6514721da31fa33abb38741b1.svg";
const imgArrow = "http://localhost:3845/assets/b65843a80a0735fc8f68573d0d340945bf14b64d.svg";
const imgTablerIconGripVertical = "http://localhost:3845/assets/4cfc65018e77819bb8313a9007d03e5ebd60e6b6.svg";
const imgTablerIconPlus = "http://localhost:3845/assets/478c0949a8079ae150f15e45e6e7eef855df6a2e.svg";
const imgTablerIconMessagePlus = "http://localhost:3845/assets/4f8d820332863068d590cc942680670c5485bb32.svg";

type CursorsPointerProps = {
  className?: string;
  type?: "Arrow" | "Grab" | "Grabbed" | "Help" | "Move" | "Pointer" | "Pointer active" | "Text" | "ZoomIn" | "ZoomOut";
};

function CursorsPointer({ className, type = "Arrow" }: CursorsPointerProps) {
  if (type === "Text") {
    return (
      <div className={className} data-name="Type=Text" data-node-id="321:908">
        <div className="absolute flex h-[calc(1px*((var(--transform-inner-width)*1)+(var(--transform-inner-height)*0)))] items-center justify-center left-[calc(50%-0.039px)] top-[calc(50%-0.468px)] translate-x-[-50%] translate-y-[-50%] w-[calc(1px*((var(--transform-inner-height)*1)+(var(--transform-inner-width)*0)))]" style={{ "--transform-inner-width": "15.90625", "--transform-inner-height": "7.0625" } as React.CSSProperties}>
          <div className="flex-none rotate-[90deg]">
            <div className="h-[7.064px] relative w-[15.921px]" data-name="beam" data-node-id="321:909">
              <div className="absolute inset-[-15.02%_-6.28%_-15.05%_-6.28%]">
                <img alt="" className="block max-w-none size-full" src={imgBeam} />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className={className} data-name="Type=Arrow" data-node-id="321:853">
      <div className="absolute h-[17.578px] left-[calc(50%+0.707px)] top-[calc(50%-0.211px)] translate-x-[-50%] translate-y-[-50%] w-[11.414px]" data-name="Arrow" data-node-id="321:854">
        <div className="absolute inset-[-4.55%_-15.77%_-15.93%_-15.77%]">
          <img alt="" className="block max-w-none size-full" src={imgArrow} />
        </div>
      </div>
    </div>
  );
}

export default function BlockNote() {
  return (
    <div className="bg-black relative size-full" data-name="BlockNote" data-node-id="452:721">
      <div className="absolute flex flex-col font-['Geist_Mono',_monospace] font-normal justify-center leading-[2] left-[393px] opacity-80 text-[16px] text-white top-[737px] translate-y-[-50%] w-[558px]" data-node-id="452:722">
        <p className="mb-0 whitespace-pre-wrap">
          Google Brain avaswani@google.com
          <br aria-hidden="true" />
          {`&Noam Shazeer1`}
          <br aria-hidden="true" />
          Google Brain noam@google.com
          <br aria-hidden="true" />
          {`&Niki Parmar1`}
          <br aria-hidden="true" />
          Google Research nikip@google.com
          <br aria-hidden="true" />
          {`&Jakob Uszkoreit1`}
          <br aria-hidden="true" />
          Google Research usz@google.com
          <br aria-hidden="true" />
          {`&Llion Jones1`}
          <br aria-hidden="true" />
          Google Research llion@google.com
          <br aria-hidden="true" />
          {`&Aidan N. Gomez1   `}
          <br aria-hidden="true" />
          {`University of Toronto aidan@cs.toronto.edu &Łukasz Kaiser1`}
          <br aria-hidden="true" />
          Google Brain lukaszkaiser@google.com
          <br aria-hidden="true" />
          {`&Illia Polosukhin1  `}
          <br aria-hidden="true" />
          illia.polosukhin@gmail.com
          <br aria-hidden="true" />
          <br aria-hidden="true" />
        </p>
        <p>Equal contribution. Listing order is random. Jakob proposed replacing RNNs with self-attention and started the effort to evaluate this idea. Ashish, with Illia, designed and implemented the first Transformer models and has been crucially involved in every aspect of this work. Noam proposed scaled dot-product attention, multi-head attention and the parameter-free position representation and became the other person involved in nearly every detail. Niki designed, implemented, tuned and evaluated countless model variants in our original codebase and tensor2tensor. Llion also experimented with novel model variants, was responsible for our initial codebase, and efficient inference and visualizations. Lukasz and Aidan spent countless long days designing various parts of and implementing tensor2tensor, replacing our earlier codebase, greatly improving results and massively accelerating our research. Work performed while at Google Brain.Work performed while at Google Research.</p>
      </div>
      <div className="absolute border-[0px_0px_1px] border-[rgba(255,255,255,0.08)] border-solid box-border content-stretch flex items-center justify-between left-[-486px] pl-[16px] pr-[8px] py-[6.5px] top-0 w-[1171px]" data-node-id="452:723">
        <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0" data-node-id="452:724">
          <div className="[grid-area:1_/_1] ml-0 mt-0 overflow-clip relative size-[20px]" data-name="tabler-icon-file-description" data-node-id="452:725">
            <p className="absolute font-['Urbanist',_sans-serif] font-normal leading-none left-[calc(50%-7px)] text-[15px] text-nowrap text-white top-[calc(50%-7px)] whitespace-pre" data-node-id="452:726">{`🧠 `}</p>
          </div>
          <p className="[grid-area:1_/_1] font-['Urbanist',_sans-serif] font-normal leading-none ml-[32px] mt-[2.5px] overflow-ellipsis overflow-hidden relative text-[15px] text-nowrap text-white whitespace-pre" data-node-id="452:727">
            Attention Is All You Need
          </p>
        </div>
      </div>
      <div className="absolute flex flex-col font-['Urbanist',_sans-serif] font-bold justify-center leading-[0] left-[calc(50%-318.111px)] text-[32px] text-nowrap text-white top-[139px] translate-y-[-50%]" data-node-id="452:781">
        <p className="leading-[1.5] whitespace-pre">Attention Is All You Need</p>
      </div>
      <div className="absolute bg-[#d9d9d9] h-[32px] left-[385px] opacity-[0.12] rounded-[6px] top-[179px] w-[575px]" data-node-id="452:782" />
      <div className="absolute left-[364.57px] size-[16px] top-[186px]" data-name="tabler-icon-grip-vertical" data-node-id="452:783">
        <img alt="" className="block max-w-none size-full" src={imgTablerIconGripVertical} />
      </div>
      <div className="absolute flex flex-col font-['Geist_Mono',_monospace] font-normal justify-center leading-[0] left-[393px] text-[16px] text-white top-[195px] translate-y-[-50%] w-[558px]" data-node-id="452:785">
        <p className="leading-none">Ashish Vaswani</p>
      </div>
      <div className="absolute left-[344px] size-[16px] top-[186px]" data-name="tabler-icon-plus" data-node-id="452:786">
        <img alt="" className="block max-w-none size-full" src={imgTablerIconPlus} />
      </div>
      <div className="absolute left-[971px] size-[18px] top-[188px]" data-name="tabler-icon-message-plus" data-node-id="452:788">
        <img alt="" className="block max-w-none size-full" src={imgTablerIconMessagePlus} />
      </div>
      <CursorsPointer type="Text" className="absolute left-[905px] size-[24px] top-[196px]" />
      <div className="absolute bg-[rgba(255,195,28,0.12)] border-[#ffc31c] border-[0px_0px_1px] border-solid h-[25px] left-[542px] top-[406px] w-[143px]" data-node-id="452:823" />
    </div>
  );
}
