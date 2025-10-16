import TextEffectWithExit from "../components/text-effect";

const Footer = () => {
  return (
    <section className="c-space border-black-300 relative flex w-full flex-col items-center gap-5 overflow-x-hidden overflow-y-hidden border-t pt-7 pb-3">
      <div className="absolute top-1 flex origin-top-left scale-[1] gap-2 text-black dark:text-white">
        <TextEffectWithExit
          text="Powered by Polar Bear"
          style=" text-sm font-bold"
        />
      </div>

      <p className="font-grotesk mt-[25px] self-center text-center text-[12px] font-normal text-neutral-800 dark:text-neutral-200">
        2025, All Rights Reserved
      </p>
    </section>
  );
};

export default Footer;
