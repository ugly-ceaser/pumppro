import StationList from '@/components/StationList'
import Map from '@/components/Map'

export default function Home() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Nearby Petrol Stations</h1>
      <div className="grid md:grid-cols-2 gap-4">
        <StationList />
        <Map />
      </div>
    </div>
  )
}

