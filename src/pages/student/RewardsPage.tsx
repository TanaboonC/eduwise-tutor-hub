import { useState } from "react";
import { StudentLayout } from "@/components/student/StudentLayout";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { 
  Gift, 
  Star, 
  Trophy,
  Clock,
  CheckCircle,
  Sparkles,
  Package,
  ArrowRight,
  Zap
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { toast } from "@/hooks/use-toast";

const currentPoints = 1250;
const nextTierPoints = 1500;

const rewards = [
  {
    id: 1,
    name: "Early Worm T-Shirt",
    points: 500,
    image: "👕",
    description: "Exclusive Early Worm Tutor branded t-shirt",
    category: "Merchandise"
  },
  {
    id: 2,
    name: "Study Notebook Set",
    points: 300,
    image: "📓",
    description: "Premium quality notebooks for your studies",
    category: "School Supplies"
  },
  {
    id: 3,
    name: "Course Discount Voucher",
    points: 800,
    image: "🎟️",
    description: "10% discount on your next course registration",
    category: "Vouchers"
  },
  {
    id: 4,
    name: "Wireless Earbuds",
    points: 2000,
    image: "🎧",
    description: "High-quality wireless earbuds for focused study",
    category: "Electronics"
  },
  {
    id: 5,
    name: "Book Store Gift Card",
    points: 1000,
    image: "📚",
    description: "฿500 gift card for educational books",
    category: "Vouchers"
  },
  {
    id: 6,
    name: "Premium Backpack",
    points: 1500,
    image: "🎒",
    description: "Durable backpack with laptop compartment",
    category: "Merchandise"
  },
];

const redemptionHistory = [
  { id: 1, reward: "Study Notebook Set", points: 300, date: "2024-01-15", status: "Delivered" },
  { id: 2, reward: "Early Worm T-Shirt", points: 500, date: "2024-01-20", status: "Shipped" },
];

const pointsHistory = [
  { id: 1, action: "Completed Math Quiz", points: 50, date: "2024-01-28" },
  { id: 2, action: "100% Attendance Bonus", points: 100, date: "2024-01-27" },
  { id: 3, action: "Exam Score Above 90%", points: 75, date: "2024-01-25" },
  { id: 4, action: "Completed Practice Set", points: 25, date: "2024-01-24" },
];

export default function RewardsPage() {
  const [selectedReward, setSelectedReward] = useState<typeof rewards[0] | null>(null);
  const [showRedemption, setShowRedemption] = useState(false);

  const handleRedeem = () => {
    if (selectedReward && currentPoints >= selectedReward.points) {
      setShowRedemption(false);
      toast({
        title: "Reward Redeemed! 🎉",
        description: `You've successfully redeemed ${selectedReward.name}. Check your delivery status.`,
      });
      setSelectedReward(null);
    }
  };

  return (
    <StudentLayout
      title="Rewards Center"
      description="Earn points and redeem exciting rewards"
    >
      {/* Points Overview */}
      <div className="grid gap-6 md:grid-cols-3 mb-8">
        <div className="md:col-span-2 bg-gradient-to-r from-primary to-sage-dark rounded-2xl p-6 text-primary-foreground relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-card/10 rounded-full -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-card/10 rounded-full translate-y-1/2 -translate-x-1/2" />
          <div className="relative">
            <div className="flex items-center gap-2 mb-2">
              <Star className="h-5 w-5 fill-current" />
              <span className="font-medium">Your Points Balance</span>
            </div>
            <p className="text-5xl font-bold mb-4">{currentPoints.toLocaleString()}</p>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Progress to Gold Tier</span>
                <span>{currentPoints}/{nextTierPoints}</span>
              </div>
              <div className="h-3 bg-card/20 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gold rounded-full transition-all duration-500"
                  style={{ width: `${(currentPoints / nextTierPoints) * 100}%` }}
                />
              </div>
              <p className="text-sm opacity-80">{nextTierPoints - currentPoints} points until Gold Tier</p>
            </div>
          </div>
        </div>

        <div className="bg-card rounded-2xl shadow-soft border border-border p-6">
          <h3 className="font-bold text-foreground flex items-center gap-2 mb-4">
            <Zap className="h-5 w-5 text-warning" />
            Quick Stats
          </h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">This Month</span>
              <span className="font-bold text-foreground">+250 pts</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Total Earned</span>
              <span className="font-bold text-foreground">2,050 pts</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Redeemed</span>
              <span className="font-bold text-foreground">800 pts</span>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="mb-8">
        <h3 className="font-bold text-lg text-foreground mb-4 flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-primary" />
          Recent Points Earned
        </h3>
        <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-4">
          {pointsHistory.map((item) => (
            <div key={item.id} className="bg-card rounded-xl p-4 shadow-soft border border-border">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-muted-foreground">{new Date(item.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
                <span className="text-success font-bold">+{item.points}</span>
              </div>
              <p className="text-sm font-medium text-foreground">{item.action}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Rewards Gallery */}
      <div className="mb-8">
        <h3 className="font-bold text-lg text-foreground mb-4 flex items-center gap-2">
          <Gift className="h-5 w-5 text-primary" />
          Available Rewards
        </h3>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {rewards.map((reward) => {
            const canAfford = currentPoints >= reward.points;
            return (
              <div 
                key={reward.id} 
                className="bg-card rounded-2xl shadow-soft border border-border overflow-hidden card-hover group"
              >
                <div className="h-32 bg-gradient-to-br from-primary/10 to-sage-light/30 flex items-center justify-center">
                  <span className="text-6xl group-hover:scale-110 transition-transform">{reward.image}</span>
                </div>
                <div className="p-4">
                  <span className="text-xs font-medium text-primary bg-primary/10 px-2 py-1 rounded-full">
                    {reward.category}
                  </span>
                  <h4 className="font-bold text-foreground mt-2">{reward.name}</h4>
                  <p className="text-sm text-muted-foreground mt-1 mb-4">{reward.description}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 text-gold fill-gold" />
                      <span className="font-bold text-foreground">{reward.points}</span>
                      <span className="text-sm text-muted-foreground">pts</span>
                    </div>
                    <Button 
                      size="sm"
                      variant={canAfford ? "default" : "outline"}
                      disabled={!canAfford}
                      onClick={() => {
                        setSelectedReward(reward);
                        setShowRedemption(true);
                      }}
                    >
                      {canAfford ? "Redeem" : "Need more pts"}
                    </Button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Redemption History */}
      <div className="bg-card rounded-2xl shadow-soft border border-border overflow-hidden">
        <div className="p-4 border-b border-border bg-muted/30">
          <h3 className="font-bold text-foreground flex items-center gap-2">
            <Package className="h-5 w-5 text-primary" />
            Redemption History
          </h3>
        </div>
        <div className="divide-y divide-border">
          {redemptionHistory.map((item) => (
            <div key={item.id} className="p-4 flex items-center justify-between hover:bg-muted/30 transition-colors">
              <div>
                <p className="font-medium text-foreground">{item.reward}</p>
                <p className="text-sm text-muted-foreground">
                  {new Date(item.date).toLocaleDateString()} • {item.points} points
                </p>
              </div>
              <div className="flex items-center gap-2">
                {item.status === "Delivered" ? (
                  <span className="inline-flex items-center gap-1 px-3 py-1 bg-success/10 text-success text-sm font-medium rounded-full">
                    <CheckCircle className="h-4 w-4" />
                    {item.status}
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 px-3 py-1 bg-info/10 text-info text-sm font-medium rounded-full">
                    <Clock className="h-4 w-4" />
                    {item.status}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Redemption Dialog */}
      <Dialog open={showRedemption} onOpenChange={setShowRedemption}>
        <DialogContent className="bg-card">
          <DialogHeader>
            <DialogTitle>Redeem Reward</DialogTitle>
            <DialogDescription>
              Confirm your reward redemption
            </DialogDescription>
          </DialogHeader>
          
          {selectedReward && (
            <div className="text-center py-4">
              <div className="h-24 w-24 bg-gradient-to-br from-primary/10 to-sage-light/30 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <span className="text-5xl">{selectedReward.image}</span>
              </div>
              <h4 className="font-bold text-lg text-foreground">{selectedReward.name}</h4>
              <p className="text-muted-foreground text-sm mt-1">{selectedReward.description}</p>
              
              <div className="mt-6 p-4 bg-muted/50 rounded-xl">
                <div className="flex items-center justify-center gap-2">
                  <Star className="h-5 w-5 text-gold fill-gold" />
                  <span className="text-2xl font-bold text-foreground">{selectedReward.points}</span>
                  <span className="text-muted-foreground">points</span>
                </div>
                <p className="text-sm text-muted-foreground mt-2">
                  Balance after: {(currentPoints - selectedReward.points).toLocaleString()} points
                </p>
              </div>
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowRedemption(false)}>
              Cancel
            </Button>
            <Button onClick={handleRedeem}>
              <Gift className="h-4 w-4 mr-2" />
              Confirm Redemption
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </StudentLayout>
  );
}
