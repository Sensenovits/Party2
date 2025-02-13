import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Users, MapPin, Calendar, Award, MessageSquare, Star, User, PlusCircle } from 'lucide-react';

const PartyConnect = () => {
  const [activeTab, setActiveTab] = useState('discover');
  const [showCreateEvent, setShowCreateEvent] = useState(false);
  const [userProfile, setUserProfile] = useState({
    name: 'John Doe',
    roles: ['Crew', 'Motivator'],
    rating: 4.5,
    achievements: ['Team Player', 'Event Expert'],
    participatedEvents: 12
  });

  // Sample data
  const upcomingEvents = [
    {
      id: 1,
      title: "Beach Cleanup Initiative",
      type: "Community Engagement",
      date: "2025-02-15",
      location: "Sunset Beach",
      description: "Join us for a community beach cleanup event. Together we can make a difference!",
      organizer: {
        name: "Sarah Wilson",
        rating: 4.8,
        role: "Motivator"
      },
      roles: {
        sponsor: { required: 2, filled: 1 },
        booster: { required: 3, filled: 2 },
        spot: { required: 1, filled: 1 },
        crew: { required: 15, filled: 8 },
        motivator: { required: 2, filled: 1 }
      }
    },
    {
      id: 2,
      title: "Chess Tournament",
      type: "Skill-Based Activity",
      date: "2025-02-20",
      location: "Community Center",
      description: "Monthly chess tournament for all skill levels. Prizes for winners!",
      organizer: {
        name: "Mike Chen",
        rating: 4.9,
        role: "Sponsor"
      },
      roles: {
        sponsor: { required: 1, filled: 1 },
        booster: { required: 2, filled: 2 },
        spot: { required: 1, filled: 1 },
        crew: { required: 12, filled: 8 },
        motivator: { required: 2, filled: 1 }
      }
    }
  ];

  const EventCreationForm = () => (
    <div className="space-y-4">
      <Input placeholder="Event Title" />
      <Select defaultValue="social">
        <SelectTrigger>
          <SelectValue placeholder="Event Type" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="social">Social Gathering</SelectItem>
          <SelectItem value="skill">Skill-Based Activity</SelectItem>
          <SelectItem value="community">Community Engagement</SelectItem>
          <SelectItem value="creative">Creative Collaboration</SelectItem>
        </SelectContent>
      </Select>
      <Input type="date" />
      <Input placeholder="Location" />
      <Textarea placeholder="Event Description" />
      
      <div className="space-y-2">
        <p className="text-sm font-medium">Required Roles</p>
        {['Sponsor', 'Booster', 'Spot', 'Crew', 'Motivator'].map(role => (
          <div key={role} className="flex items-center gap-2">
            <span className="w-24 text-sm">{role}</span>
            <Input type="number" min="0" placeholder="Required" className="w-24" />
          </div>
        ))}
      </div>
      
      <div className="flex justify-end gap-2">
        <Button variant="outline" onClick={() => setShowCreateEvent(false)}>Cancel</Button>
        <Button>Create Event</Button>
      </div>
    </div>
  );

  const UserProfile = () => (
    <Card>
      <CardContent className="pt-6">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
            <User className="w-8 h-8 text-blue-500" />
          </div>
          <div>
            <h3 className="font-semibold text-lg">{userProfile.name}</h3>
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <Star className="w-4 h-4 text-yellow-500" />
              {userProfile.rating} · {userProfile.participatedEvents} Events
            </div>
          </div>
        </div>
        
        <div className="mt-4">
          <p className="text-sm font-medium mb-2">Preferred Roles:</p>
          <div className="flex flex-wrap gap-2">
            {userProfile.roles.map(role => (
              <Badge key={role} variant="secondary">{role}</Badge>
            ))}
          </div>
        </div>
        
        <div className="mt-4">
          <p className="text-sm font-medium mb-2">Achievements:</p>
          <div className="flex flex-wrap gap-2">
            {userProfile.achievements.map(achievement => (
              <Badge key={achievement} variant="outline">{achievement}</Badge>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );

  const RoleIndicator = ({ role, required, filled }) => (
    <div className="flex items-center gap-2 text-sm">
      <Badge variant={filled === required ? "secondary" : "outline"}>
        {role}: {filled}/{required}
      </Badge>
    </div>
  );

  const EventCard = ({ event }) => (
    <Card className="mb-4">
      <CardContent className="pt-6">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-semibold text-lg">{event.title}</h3>
            <div className="flex items-center gap-2 text-sm text-gray-500 mt-1">
              <Calendar className="w-4 h-4" />
              {event.date}
              <MapPin className="w-4 h-4 ml-2" />
              {event.location}
            </div>
          </div>
          <Badge>{event.type}</Badge>
        </div>
        
        <p className="mt-3 text-sm text-gray-600">{event.description}</p>
        
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
              <RoleIndicator 
                key={role}
                role={role.charAt(0).toUpperCase() + role.slice(1)}
                required={data.required}
                filled={data.filled}
              />
            ))}
          </div>
        </div>
        
        <div className="mt-4 flex justify-end gap-2">
          <Button variant="outline">Contact Organizer</Button>
          <Button>Join Event</Button>
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
            <EventCreationForm />
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-3 gap-6">
        <div className="col-span-1">
          <UserProfile />
        </div>

        <div className="col-span-2">
          <Tabs defaultValue="discover" className="w-full">
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
                </div>
                {upcomingEvents.map(event => (
                  <EventCard key={event.id} event={event} />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="myEvents">
              <Card>
                <CardHeader>
                  <CardTitle>My Events</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-500">You haven't joined any events yet.</p>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="achievements">
              <Card>
                <CardHeader>
                  <CardTitle>My Achievements</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 border rounded-lg">
                      <Award className="w-8 h-8 mb-2 text-blue-500" />
                      <h3 className="font-medium">First Time Sponsor</h3>
                      <p className="text-sm text-gray-500">Sponsor your first event</p>
                    </div>
                    <div className="p-4 border rounded-lg">
                      <Users className="w-8 h-8 mb-2 text-blue-500" />
                      <h3 className="font-medium">Team Player</h3>
                      <p className="text-sm text-gray-500">Join 5 events as Crew</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="messages">
              <Card>
                <CardHeader>
                  <CardTitle>Messages</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-500">No new messages</p>
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
