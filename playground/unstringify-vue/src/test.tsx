export default function TestTsx() {
  return (
    <div
      data-aaa={{
        type: 'type_a',
        name: 'name_a',
        desc: 'desc_a',
      }}
    >
      <p
        data-bbb={{
          type: 'type_b',
          name: 'name_b',
          desc: 'desc_b',
        }}
      >
        jsx
      </p>
    </div>
  );
}
