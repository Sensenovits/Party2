"use client"

import { useState } from "react"
import { PlusCircle, Users, Calendar, Award, MessageSquare, UserPlus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { UserProfile } from "./components/user-profile"
import { EventList } from "./components/event-list"
import { EventCreationForm } from "./components/event-creation-form"
import { EventFilters } from "./components/event-filters"
import { EmptyEvents, EmptyMyEvents, EmptyAchievements, EmptyMessages } from "./components/empty-states"
import { RoleRegistrationForm } from "./components/role-registration-form"
import { toast } from "@/components/ui/use-toast"
import { calculateDistance } from "./utils/location"
import type { UserRole } from "./types/roles"
import type { Coordinates } from "./utils/location"

const initialUserProfile = {
  name: "Alex Thompson",
  role: "Motivator",
  rating: 4.7,
  contributions: ["Event Expert", "Community Leader"],
  eventsJoined: 15,
}

const initialEvents = [
  {
    id: 1,
    title: "Community Beach Cleanup",
    type: "Civic Engagement",
    date: "2025-02-15",
    location: "Sunset Beach",
    coordinates: {
      latitude: 34.0522,
      longitude: -118.2437,
    },
    description: "Join our beach cleanup initiative. Together we can make our beach beautiful!",
    organizer: {
      name: "Sarah Wilson",
      rating: 4.8,
      role: "Motivator",
    },
    roles: {
      sponsor: { required: 1, filled: 0 },
      booster: { required: 2, filled: 1 },
      crew: { required: 10, filled: 4 },
    },
  },
  // Add more events with different coordinates
]

export default function PartyConnect() {
  const [userProfile, setUserProfile] = useState(initialUserProfile)
  const [events, setEvents] = useState(initialEvents)
  const [showCreateEvent, setShowCreateEvent] = useState(false)
  const [showRoleRegistration, setShowRoleRegistration] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedType, setSelectedType] = useState("all")
  const [userLocation, setUserLocation] = useState<Coordinates | null>(null)
  const [searchRadius, setSearchRadius] = useState(10) // Default 10km radius

  const filteredEvents = events
    .filter((event) => {
      // Text search filter
      const matchesSearch =
        event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        event.description.toLowerCase().includes(searchQuery.toLowerCase())

      // Type filter
      const matchesType = selectedType === "all" || event.type === selectedType

      // Location filter
      let matchesLocation = true
      if (userLocation && event.coordinates) {
        const distance = calculateDistance(userLocation, event.coordinates)
        matchesLocation = distance <= searchRadius
      }

      return matchesSearch && matchesType && matchesLocation
    })
    .sort((a, b) => {
      // Sort by distance if location is available
      if (userLocation && a.coordinates && b.coordinates) {
        const distanceA = calculateDistance(userLocation, a.coordinates)
        const distanceB = calculateDistance(userLocation, b.coordinates)
        return distanceA - distanceB
      }
      return 0
    })

  const handleCreateEvent = (formData) => {
    const newEvent = {
      ...formData,
      id: events.length + 1,
      coordinates: userLocation, // Use current user location for new events
      organizer: {
        name: userProfile.name,
        rating: userProfile.rating,
        role: userProfile.role,
      },
    }
    setEvents([...events, newEvent])
    setShowCreateEvent(false)
    toast({
      title: "Event Created",
      description: "Your event has been successfully created.",
    })
  }

  const handleRoleRegistration = (formData) => {
    setUserProfile((prev) => ({
      ...prev,
      role: formData.role as UserRole,
      // Add other relevant user data
    }))
    setShowRoleRegistration(false)
    toast({
      title: "Role Registered",
      description: `You are now registered as a ${formData.role}.`,
    })
  }

  const canCreateEvent = userProfile.role === "Motivator"

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Party Connect</h1>
        <div className="flex gap-2">
          <Dialog open={showRoleRegistration} onOpenChange={setShowRoleRegistration}>
            <DialogTrigger asChild>
              <Button variant="outline">
                <UserPlus className="w-4 h-4 mr-2" />
                Register Role
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle>Register Your Role</DialogTitle>
              </DialogHeader>
              <RoleRegistrationForm onSubmit={handleRoleRegistration} />
            </DialogContent>
          </Dialog>

          {canCreateEvent && (
            <Dialog open={showCreateEvent} onOpenChange={setShowCreateEvent}>
              <DialogTrigger asChild>
                <Button>
                  <PlusCircle className="w-4 h-4 mr-2" />
                  Create Event
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[600px]">
                <DialogHeader>
                  <DialogTitle>Create New Event</DialogTitle>
                </DialogHeader>
                <EventCreationForm onSubmit={handleCreateEvent} onCancel={() => setShowCreateEvent(false)} />
              </DialogContent>
            </Dialog>
          )}
        </div>
      </div>

      <div className="grid grid-cols-3 gap-6">
        <div className="col-span-1">
          <UserProfile userProfile={userProfile} />
        </div>
        <div className="col-span-2">
          <Tabs defaultValue="discover" className="space-y-4">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="discover">
                <Users className="w-4 h-4 mr-2" />
                Discover
              </TabsTrigger>
              <TabsTrigger value="myEvents">
                <Calendar className="w-4 h-4 mr-2" />
                My Events
              </TabsTrigger>
              <TabsTrigger value="achievements">
                <Award className="w-4 h-4 mr-2" />
                Achievements
              </TabsTrigger>
              <TabsTrigger value="messages">
                <MessageSquare className="w-4 h-4 mr-2" />
                Messages
              </TabsTrigger>
            </TabsList>

            <TabsContent value="discover">
              <EventFilters
                onSearchChange={setSearchQuery}
                onTypeChange={setSelectedType}
                onLocationChange={setUserLocation}
                onRadiusChange={setSearchRadius}
                selectedType={selectedType}
              />
              {filteredEvents.length > 0 ? (
                <EventList events={filteredEvents} userLocation={userLocation} />
              ) : (
                <EmptyEvents onAction={() => setShowCreateEvent(true)} />
              )}
            </TabsContent>

            <TabsContent value="myEvents">
              <EmptyMyEvents onAction={() => setShowCreateEvent(true)} />
            </TabsContent>

            <TabsContent value="achievements">
              <EmptyAchievements />
            </TabsContent>

            <TabsContent value="messages">
              <EmptyMessages />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}

