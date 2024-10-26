'use client'

import React from "react"
import { useRouter } from "next/navigation"
import { Cover } from "@/components/ui/cover"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Palette, Share2, Calendar, Gift, Sparkles, Users } from "lucide-react"

export function HomePage() {
  const router = useRouter()

  const features = [
    {
      title: "Personalized Designs",
      description: "Create unique invitations that reflect your style and event theme.",
      icon: <Palette className="h-6 w-6 text-primary" />,
    },
    {
      title: "Easy Sharing",
      description: "Share your invitations effortlessly via email, social media, or messaging apps.",
      icon: <Share2 className="h-6 w-6 text-primary" />,
    },
    {
      title: "Event Management",
      description: "Keep track of RSVPs, send reminders, and manage your guest list all in one place.",
      icon: <Calendar className="h-6 w-6 text-primary" />,
    },
    {
      title: "Gift Registry",
      description: "Integrate gift registries or wishlists directly into your digital invitations.",
      icon: <Gift className="h-6 w-6 text-primary" />,
    },
    {
      title: "Interactive Elements",
      description: "Add polls, countdowns, or photo galleries to make your invitations more engaging.",
      icon: <Sparkles className="h-6 w-6 text-primary" />,
    },
    {
      title: "Collaborative Creation",
      description: "Work together with co-hosts to design and manage your event invitations.",
      icon: <Users className="h-6 w-6 text-primary" />,
    },
  ]

  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold text-center mt-20 relative z-20 py-6 bg-clip-text text-transparent bg-gradient-to-b from-neutral-800 via-neutral-700 to-neutral-700 dark:from-neutral-800 dark:via-white dark:to-white">
        Old invites don't cut it anymore <br /> we <Cover>bring them to life.</Cover>
      </h1>

      <p className="text-black dark:text-white font-medium text-lg max-w-2xl mx-auto text-center mt-5">
        Create personalized digital invitations for birthdays, events or anything you'd like.
        Share them effortlessly with friends and family. Create memories that last a lifetime.
      </p>

      <div className="flex justify-center mt-10">
        <Button
          onClick={() => router.push('/home')}
          className="px-6 py-3 text-lg font-semibold transition-all duration-200 ease-in-out transform hover:scale-105"
        >
          Get started
        </Button>
      </div>

      <div className="mt-20">
        <h2 className="text-3xl font-bold text-center mb-12">Why Choose Our Platform?</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="transition-all duration-200 ease-in-out transform hover:scale-105">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  {feature.icon}
                  <span>{feature.title}</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>{feature.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* <div className="mt-20 text-center">
        <h2 className="text-3xl font-bold mb-6">Ready to revolutionize your invitations?</h2>
        <Button
          onClick={() => router.push('/create')}
          className="px-6 py-3 text-lg font-semibold transition-all duration-200 ease-in-out transform hover:scale-105"
        >
          Create Your First Invitation
        </Button>
      </div> */}
    </div>
  )
}