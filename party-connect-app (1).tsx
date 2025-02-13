import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Users, MapPin, Calendar, Award, MessageSquare, Star, User, PlusCircle } from 'lucide-react';

const PartyConnect = () => {
  const [events, setEvents] = useState([
    {
      id: 1,
      title: "Community Beach Cleanup",
      type: "Civic Engagement",
      date: "2025-02-15",
      location: "Sunset Beach",
      description: "Join our beach cleanup initiative. Together we can make our beach beautiful!",
      organizer: {
        name: "Sarah Wilson",
        rating: 4.8,
        role: "Motivator"
      },
      roles: {
        sponsor: { required: 1, filled: 0 },
        booster: { required: 2, filled: 1 },
        crew: { required: 10, filled: 4 }
      }
    },
    {
      id: 2,
      title: "Chess Tournament",
      type: "Skill Building",
      date: "2025-02-20",
      location: "Community Center",
      description: "Monthly chess tournament for all skill levels. Come share your knowledge!",
      organizer: {
        name: "Mike Chen",
        rating: 4.9,
        role: "Motivator"
      },
      roles: {
        sponsor: { required: 1, filled: 1 },
        booster: { required: 2, filled: 1 },
        crew: { required: 8, filled: 5 }
      }
    }
  ]);

  const [userProfile] = useState({
    name: "Alex Thompson",
    role: "Motivator",
    rating: 4.7,
    contributions: ["Event Expert", "Community Leader"],
    eventsJoined: 15
  });

  const [showCreateEvent, setShowCreateEvent] = useState(false);

  const EventCard = ({ event }) => (
    <Card className="mb-4">
      <CardContent className="pt-4">
        <div className="flex justify-between items-start mb-2">
          <div>
            <h3 className="text-lg font-semibold">{event.title}</h3>
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <Calendar className="w-4 h-4" />
              {event.date}
              <MapPin className="w-4 h-4 ml-2" />
              {event.location}
            </div>
          </div>
          <Badge>{event.type}</Badge>
        </div>

        <p className="text-sm text-gray-600 mt-2">{event.description}</p>

        <div className="mt-4 p-3 bg-gray-50 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <User className="w-4 h-4" />
            <span className="text-sm font-medium">{event.organizer.name}</span>
            <Star className="w-4 h-4 text-yellow-500" />
            <span className="text-sm">{event.organizer.rating}</span>
            <Badge variant="outline">{event.organizer.role}</Badge>
          </div>

          <div className="flex flex-wrap gap-2">
            {Object.entries(event.roles).map(([role, data]) => (
              <Badge key={role} variant={data.filled < data.required ? "outline" : "secondary"}>
                {role}: {data.filled}/{data.required}
              </Badge>
            ))}
          </div>
        </div>

        <div className="mt-4 flex justify-end gap-2">
          <Button variant="outline">Message</Button>
          <Button>Join Event</Button>
        </div>
      </CardContent>
    </Card>
  );

  const UserProfileCard = () => (
    <Card>
      <CardContent className="pt-4">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
            <User className="w-8 h-8 text-blue-500" />
          </div>
          <div>
            <h3 className="font-semibold text-lg">{userProfile.name}</h3>
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <Star className="w-4 h-4 text-yellow-500" />
              {userProfile.rating} · {userProfile.eventsJoined} Events
            </div>
          </div>
        </div>

        <div>
          <p className="text-sm font-medium mb-2">Role:</p>
          <Badge className="mb-4">{userProfile.role}</Badge>
        </div>

        <div>
          <p className="text-sm font-medium mb-2">Contributions:</p>
          <div className="flex flex-wrap gap-2">
            {userProfile.contributions.map(contribution => (
              <Badge key={contribution} variant="outline">
                {contribution}
              </Badge>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Party Connect</h1>
        <Dialog open={showCreateEvent} onOpenChange={setShowCreateEvent}>
          <DialogTrigger asChild>
            <Button>
              <PlusCircle className="w-4 h-4 mr-2" />
              Create Event
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New Event</DialogTitle>
            </DialogHeader>
            {/* Event creation form would go here */}
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-3 gap-6">
        <div className="col-span-1">
          <UserProfileCard />
        </div>

        <div className="col-span-2">
          <Tabs defaultValue="discover">
            <TabsList className="grid w-full grid-cols-4 mb-4">
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
              <div className="space-y-4">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-semibold">Upcoming Events</h2>
                  <Select defaultValue="all">
                    <SelectTrigger className="w-40">
                      <SelectValue placeholder="Filter by type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Events</SelectItem>
                      <SelectItem value="civic">Civic Engagement</SelectItem>
                      <SelectItem value="skill">Skill Building</SelectItem>
                      <SelectItem value="social">Social Gathering</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                {events.map(event => (
                  <EventCard key={event.id} event={event} />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="myEvents">
              <Card>
                <CardContent className="text-center py-8">
                  <p className="text-gray-500">You haven't joined any events yet.</p>
                  <Button className="mt-4">Browse Events</Button>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="achievements">
              <Card>
                <CardContent className="text-center py-8">
                  <Award className="w-12 h-12 text-blue-500 mx-auto mb-4" />
                  <p className="text-gray-500">Complete more events to earn achievements!</p>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="messages">
              <Card>
                <CardContent className="text-center py-8">
                  <MessageSquare className="w-12 h-12 text-blue-500 mx-auto mb-4" />
                  <p className="text-gray-500">No messages yet</p>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default PartyConnect;
