import { create } from 'zustand'

type BranchDetailsType = {
  branchName:string
  contactNumber: string
  branchAddress: string
  openingHoursDetails:any[],
  updateBranchName: (branchName: string) => void
  updateContactNumber: (contactNumber: string) => void
  updateBranchAddress:(branchAddress:string) => void
//   updateOpeningHoursDetails:(Details:string) => void
}

export const useBranchDetails = create<BranchDetailsType>((set) => ({
  branchName: 'Shymoli',
  contactNumber: '12345678',
  branchAddress: 'Shymoli, Dhaka',
  openingHoursDetails:[],
  updateBranchName: (branchName:string) => set((state) => ({ branchName: branchName })),
  updateContactNumber: (contactNumber) => set(() => ({ contactNumber: contactNumber })),
  updateBranchAddress:(branchAddress) => set(() => ({ branchAddress: branchAddress })),
//   updateOpeningHoursDetails:(Details) => set((state) => ({ openingHoursDetails: [...state.openingHoursDetails, Details] })),
}))
