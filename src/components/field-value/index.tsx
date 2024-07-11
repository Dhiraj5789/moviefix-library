const FieldValue = ({
  title,
  description,
}: {
  title: string;
  description: string;
}) => {
  return (
    <>
      <p>
        <b>{title}</b> {description}
      </p>
    </>
  );
};

export default FieldValue;
