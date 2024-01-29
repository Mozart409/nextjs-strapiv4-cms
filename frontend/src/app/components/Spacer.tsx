export default function Spacer({
  size,
}: {
  size: "sm" | "md" | "lg" | "xl";
}) {
  if (size === "sm") {
    return (
      <>
        <div className="my-6"></div>
      </>
    );
  }

  if (size === "md") {
    return (
      <>
        <div className="my-12"></div>
      </>
    );
  }

  if (size === "lg") {
    return (
      <>
        <div className="my-16"></div>
      </>
    );
  }

  return (
    <>
      <div className="my-24"></div>
    </>
  );
}
