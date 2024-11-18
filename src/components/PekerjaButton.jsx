export default function PekerjaButton({ namaPekerja }) {
  return (
    <button className="min-h-6 w-[10%] rounded-md bg-green-800 px-2 py-1 text-white">
      { namaPekerja }
    </button>
  )
}
