export default function PekerjaButton({ pekerja }) {
  return (
    <a href={`/view-pekerja/${pekerja.pekerja_id}`} className="min-h-6 w-[10%] rounded-md bg-green-800 px-2 py-1 text-white">
      { pekerja.nama_pekerja }
    </a>
  )
}
