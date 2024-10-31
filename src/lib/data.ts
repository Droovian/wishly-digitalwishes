export interface InvitationDetail{
    hostName : string,
    inviteeName: string,
    customMessage: string,
    eventDate:string,
    eventTime: string,
    location: string,
    template: string
    inviteType:string
}

export interface Birthday {
    invitation: {
        Hostname: string
        CustomMessage: string
        InviteDate: Date
        InviteTime: TimeRanges
        location: string
      }
}

export interface ValentineInviteProps {
    invitation: {
      to: string
      from: string
      CustomMessage: string
      InviteDate: Date
      InviteTime: TimeRanges
      location: string
    }
    onRsvp: (response: "yes" | "no") => Promise<void>
  }