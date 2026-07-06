// import { X } from 'lucide-react'

// import { Badge } from '@/components/ui/badge'
// import {
//   Select,
//   SelectContent,
//   SelectGroup,
//   SelectItem,
//   SelectLabel,
//   SelectTrigger,
//   SelectValue,
// } from '@/components/ui/select'
// import {
//   consoleManufacturers,
//   consoleTypes,
//   consolesByManufacturer,
//   consolesByTag,
//   consolesByType,
//   type ConsoleTag,
// } from '@/lib/consoleData'
// import { useConsoleStore } from '@/stores/consoleStore'

// export function ConsoleSelect() {
//   const tags = useConsoleStore((state) => state.tags)
//   const setConsolesByTags = useConsoleStore((state) => state.setConsolesByTags)
//   const grouping = useConsoleStore((state) => state.grouping)

//   return (
//     <>
//       <div className="flex flex-row flex-wrap gap-1">
//         {tags.toReversed().map((tag) => (
//           <Badge
//             key={tag}
//             variant="secondary"
//             className="cursor-pointer"
//             onClick={() => setConsolesByTags(tags.filter((t) => t !== tag))}
//           >
//             {consolesByTag[tag].name}
//             <X data-icon="inline-end" />
//           </Badge>
//         ))}
//       </div>

//       <Select
//         value={tags[tags.length - 1]}
//         onValueChange={(value) => setConsolesByTags([...tags, value as ConsoleTag])}
//       >
//         <SelectTrigger id="console">
//           <SelectValue placeholder="Select a console" />
//         </SelectTrigger>

//         <SelectContent>
//           {grouping === 'Type' &&
//             consoleTypes.map((type) => (
//               <SelectGroup key={type}>
//                 <SelectLabel>{type}</SelectLabel>
//                 {consolesByType[type].map(({ tag, name, resX, resY, ratioX, ratioY }) => (
//                   <SelectItem key={tag} value={tag}>
//                     {name}
//                     {/* [{ratioX}:{ratioY} - {resX}x{resY}] */}
//                   </SelectItem>
//                 ))}
//               </SelectGroup>
//             ))}
//           {grouping === 'Manufacturer' &&
//             consoleManufacturers.map((manufacturer) => (
//               <SelectGroup key={manufacturer}>
//                 <SelectLabel>{manufacturer}</SelectLabel>
//                 {consolesByManufacturer[manufacturer].map(
//                   ({ tag, name, resX, resY, ratioX, ratioY }) => (
//                     <SelectItem key={tag} value={tag}>
//                       {name}
//                       {/* [{ratioX}:{ratioY} - {resX}x{resY}] */}
//                     </SelectItem>
//                   ),
//                 )}
//               </SelectGroup>
//             ))}
//         </SelectContent>
//       </Select>
//     </>
//   )
// }
