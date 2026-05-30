import Image from "next/image";

type ManifestPCMediaProps = {
  title: string;
  image: string | null;
  video?: string | null;
};

export default function ManifestPCMedia({
  title,
  image,
  video,
}: ManifestPCMediaProps) {
  if (video) {
    return (
      <video
        src={video}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        poster={image ?? undefined}
        className="h-full w-full object-cover transition duration-700 ease-out group-hover:scale-[1.035]"
      />
    );
  }

  if (image) {
    return (
      <Image
        src={image}
        alt={title}
        fill
        sizes="470px"
        className="object-cover transition duration-700 ease-out group-hover:scale-[1.035]"
        unoptimized
      />
    );
  }

  return (
    <div className="h-full w-full bg-[#ded1bf]" />
  );
}