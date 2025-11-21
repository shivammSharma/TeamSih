import React, { useMemo, useState, useEffect } from 'react'
import foodData from './data.json'

// Finalized Meal Planner component with robust batch assign/unassign + string-safe IDs
// - Fixes the bug where assigning lunch overwrote other meals
// - toggleSelect coerces IDs to strings
// - batchAssign only updates selected items (doesn't replace the whole meal map)
// - Added "Unassign selected" and "Deselect all" buttons
// - Assignments + selections persisted to localStorage

const STORAGE_KEYS = { MEAL_MAP: 'foodcards_mealmap_v_final', SELECTED: 'foodcards_selected_v_final' }

function uid() {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) return crypto.randomUUID()
  return Math.random().toString(36).slice(2, 9)
}
function loadJSON(key, fallback) {
  try {
    const raw = localStorage.getItem(key)
    if (!raw) return fallback
    return JSON.parse(raw)
  } catch (e) {
    return fallback
  }
}
function saveJSON(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value))
  } catch (e) { }
}

function CardRow({ item, assignedMeal, selected, onToggleSelect }) {
  return (
    <article className="border rounded-lg p-3 bg-white">
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-start gap-3">
          <input
            type="checkbox"
            className="h-5 w-5"
            checked={selected}
            onChange={() => onToggleSelect(item._id)}
            aria-label={`Select ${item['Food Item'] || item['Name'] || item._id}`}
          />

          <div>
            <h3 className="font-medium">{item['Food Item'] || item['Name']}</h3>
            <div className="text-xs text-gray-600">{item['Category']}</div>
          </div>
        </div>

        <div className="flex flex-col items-end gap-2">
          <div className={`px-2 py-1 text-xs font-medium rounded ${assignedMeal ? 'bg-yellow-100 text-yellow-800' : 'bg-gray-100 text-gray-700'}`}>
            {assignedMeal || 'Unassigned'}
          </div>
          <div className="text-sm text-gray-500">{item['Calories (per 100g)'] ?? '—'} cal</div>
        </div>
      </div>

      {/* Full details always visible */}
      <div className="mt-3 text-sm text-gray-700 grid grid-cols-1 sm:grid-cols-2 gap-2">
        {Object.entries(item).map(([k, v]) =>
          k === '_id' ? null : (
            <div key={k} className="break-words">
              <div className="font-medium text-gray-800">{k}</div>
              <div className="text-gray-600">{String(v)}</div>
            </div>
          )
        )}
      </div>
    </article>
  )
}

export default function FoodCardList({ dataSource }) {
  const items = useMemo(() => {
    const raw = Array.isArray(dataSource) && dataSource.length ? dataSource : (Array.isArray(foodData) ? foodData : [])
    return raw.map(it => ({ ...it, _id: it.id ? String(it.id) : uid() }))
  }, [dataSource])

  // search/pagination state
  const [query, setQuery] = useState('')
  const [field, setField] = useState('All')
  const [minCalories, setMinCalories] = useState('')
  const [maxCalories, setMaxCalories] = useState('')
  const [page, setPage] = useState(1)
  const pageSize = 10

  // persisted maps (mealMap: { id: 'Breakfast' | 'Lunch' | 'Dinner' }, selectedIds: Set<string>)
  const [mealMap, setMealMap] = useState(() => loadJSON(STORAGE_KEYS.MEAL_MAP, {}))
  const [selectedIds, setSelectedIds] = useState(() => {
    const arr = loadJSON(STORAGE_KEYS.SELECTED, [])
    // normalize to Set of strings
    return new Set(Array.isArray(arr) ? arr.map(x => String(x)) : [])
  })

  useEffect(() => saveJSON(STORAGE_KEYS.MEAL_MAP, mealMap), [mealMap])
  useEffect(() => saveJSON(STORAGE_KEYS.SELECTED, Array.from(selectedIds)), [selectedIds])

  // Selected page view
  const [viewSelected, setViewSelected] = useState(false)

  const stringFields = useMemo(() => {
    if (!items || items.length === 0) return ['Food Item']
    const sample = items[0]
    return Object.keys(sample).filter(k => typeof sample[k] === 'string' && k !== '_id')
  }, [items])

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return items.filter(item => {
      const caloriesKey = 'Calories (per 100g)'
      if (minCalories !== '') {
        const min = Number(minCalories)
        const itemCal = Number(item[caloriesKey] ?? NaN)
        if (Number.isFinite(itemCal) && itemCal < min) return false
      }
      if (maxCalories !== '') {
        const max = Number(maxCalories)
        const itemCal = Number(item[caloriesKey] ?? NaN)
        if (Number.isFinite(itemCal) && itemCal > max) return false
      }

      if (!q) return true
      if (field === 'All') {
        return Object.keys(item).some(k => { if (k === '_id') return false; const v = item[k]; if (v === null || v === undefined) return false; return String(v).toLowerCase().includes(q) })
      }
      const val = item[field]
      return val !== undefined && String(val).toLowerCase().includes(q)
    })
  }, [items, query, field, minCalories, maxCalories])

  // pagination
  const total = filtered.length
  const totalPages = Math.max(1, Math.ceil(total / pageSize))
  useEffect(() => { if (page > totalPages) setPage(totalPages); if (page < 1) setPage(1) }, [page, totalPages])
  const start = (page - 1) * pageSize
  const paged = filtered.slice(start, start + pageSize)

  // assignment helpers
  const assign = (id, meal) => {
    const sid = String(id)
    setMealMap(prev => ({ ...prev, [sid]: meal }))
  }
  const batchAssign = (meal) => {
    if (selectedIds.size === 0) {
      alert('No items selected')
      return
    }

    // Coerce selected ids to strings to avoid accidental mismatches
    const selectedArray = Array.from(selectedIds).map(x => String(x))

    setMealMap(prev => {
      const next = { ...prev } // copy existing map - do not overwrite unrelated entries
      selectedArray.forEach(id => { next[id] = meal })
      return next
    })

    // optional confirmation (could be replaced with a toast)
    alert(`Assigned ${selectedArray.length} item(s) to ${meal}`)
  }
  const unassign = (id) => {
    const sid = String(id)
    setMealMap(prev => {
      const n = { ...prev }
      delete n[sid]
      return n
    })
  }

  // selection helpers (force string IDs)
  const toggleSelect = (id) => {
    const sid = String(id)
    setSelectedIds(prev => {
      const next = new Set(prev)
      if (next.has(sid)) next.delete(sid)
      else next.add(sid)
      return next
    })
  }
  const clearSelection = () => setSelectedIds(new Set())

  // grouped selected for Selected page
  const groupedSelected = useMemo(() => {
    const groups = { Breakfast: [], Lunch: [], Dinner: [], Unassigned: [] }
    items.forEach(it => {
      if (selectedIds.has(String(it._id))) {
        const meal = mealMap[String(it._id)] || 'Unassigned'
        groups[meal].push(it)
      }
    })
    return groups
  }, [items, selectedIds, mealMap])

  // selected page handlers
  const openSelectedPage = () => { if (selectedIds.size === 0) { alert('No items selected'); return } setViewSelected(true) }
  const backToList = () => setViewSelected(false)

  if (viewSelected) {
    return (
      <div className="p-6 max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-semibold">Selected items — grouped by meal</h1>
          <div className="flex items-center gap-3">
            <button onClick={backToList} className="px-3 py-1 border rounded">Back to list</button>
            <button onClick={() => { clearSelection(); backToList() }} className="px-3 py-1 border rounded">Clear selection</button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {['Breakfast', 'Lunch', 'Dinner', 'Unassigned'].map(section => (
            <section key={section} className="border rounded-lg p-4 bg-white">
              <h2 className="text-lg font-semibold mb-3">{section}</h2>

              {groupedSelected[section].length === 0 ? (
                <div className="text-sm text-gray-500">No items</div>
              ) : (
                <div className="flex flex-col gap-3">
                  {groupedSelected[section].map(item => (
                    <article key={item._id} className="border rounded p-3 bg-gray-50 flex items-start justify-between gap-4">
                      <div>
                        <h3 className="font-medium">{item['Food Item'] || item['Name']}</h3>
                        <div className="text-xs text-gray-600">{item['Category']}</div>
                      </div>

                      <div className="flex flex-col items-end gap-2">
                        <div className="text-sm">{item['Calories (per 100g)'] ?? '—'} cal</div>
                        <div className="flex gap-2">
                          <button className="px-2 py-1 text-xs border rounded" onClick={() => assign(item._id, 'Breakfast')}>B</button>
                          <button className="px-2 py-1 text-xs border rounded" onClick={() => assign(item._id, 'Lunch')}>L</button>
                          <button className="px-2 py-1 text-xs border rounded" onClick={() => assign(item._id, 'Dinner')}>D</button>
                        </div>
                        <button className="text-xs text-red-600 underline" onClick={() => unassign(item._id)}>Remove</button>
                      </div>
                    </article>
                  ))}
                </div>
              )}
            </section>
          ))}
        </div>

        <footer className="mt-6 text-sm text-gray-500">Selected items: {selectedIds.size}</footer>
      </div>
    )
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-2xl font-semibold mb-4">Meal planner — All items</h1>

      <div className="mb-4 flex flex-wrap gap-3 items-center">
        <input className="flex-1 min-w-[160px] p-2 border rounded" placeholder="Search..." value={query} onChange={e => setQuery(e.target.value)} />
        <select className="p-2 border rounded" value={field} onChange={e => setField(e.target.value)}>
          <option value="All">All fields</option>
          {stringFields.map(f => <option key={f} value={f}>{f}</option>)}
        </select>
        <input className="w-24 p-2 border rounded" placeholder="Min cal" value={minCalories} onChange={e => setMinCalories(e.target.value.replace(/[^0-9.]/g, ''))} />
        <input className="w-24 p-2 border rounded" placeholder="Max cal" value={maxCalories} onChange={e => setMaxCalories(e.target.value.replace(/[^0-9.]/g, ''))} />
        <button className="p-2 bg-gray-100 rounded border" onClick={() => { setQuery(''); setField('All'); setMinCalories(''); setMaxCalories('') }}>Reset</button>

        {/* Batch assign + utility buttons */}
        <div className="ml-2 flex flex-wrap items-center gap-2">
          <button className="px-3 py-1 bg-yellow-400 text-white rounded" onClick={() => batchAssign('Breakfast')}>Assign selected to Breakfast</button>
          <button className="px-3 py-1 bg-emerald-500 text-white rounded" onClick={() => batchAssign('Lunch')}>Assign selected to Lunch</button>
          <button className="px-3 py-1 bg-rose-500 text-white rounded" onClick={() => batchAssign('Dinner')}>Assign selected to Dinner</button>

          <button className="px-3 py-1 bg-gray-200 text-gray-800 rounded" onClick={() => {
            if (selectedIds.size === 0) { alert('No items selected'); return }
            const arr = Array.from(selectedIds).map(x => String(x))
            setMealMap(prev => {
              const next = { ...prev }
              arr.forEach(id => { delete next[id] })
              return next
            })
            alert(`Unassigned ${arr.length} item(s)`)
          }}>Unassign selected</button>

          <button className="px-3 py-1 bg-white text-gray-700 border rounded" onClick={() => {
            if (selectedIds.size === 0) return
            if (!confirm('Deselect all selected items?')) return
            setSelectedIds(new Set())
          }}>Deselect all</button>
        </div>

        <button className="px-3 py-1 bg-blue-600 text-white rounded ml-auto" onClick={openSelectedPage}>Open selected ({selectedIds.size})</button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {paged.map(item => (
          <div key={item._id} className="p-1">
            <CardRow item={item} assignedMeal={mealMap[String(item._id)]} selected={selectedIds.has(String(item._id))} onToggleSelect={toggleSelect} />
          </div>
        ))}
      </div>

      {filtered.length === 0 && <div className="mt-8 text-center text-gray-600">No results found.</div>}

      <div className="flex justify-between items-center mt-6">
        <div className="text-sm text-gray-600">Showing {start + 1}–{Math.min(start + paged.length, total)} of {total}</div>
        <div className="flex items-center gap-3">
          <button disabled={page === 1} onClick={() => setPage(p => Math.max(1, p - 1))} className="px-3 py-1 border rounded disabled:opacity-40">Prev</button>
          <div className="text-sm">Page {page} / {totalPages}</div>
          <button disabled={page >= totalPages} onClick={() => setPage(p => Math.min(totalPages, p + 1))} className="px-3 py-1 border rounded disabled:opacity-40">Next</button>
        </div>
      </div>

    </div>
  )
}
