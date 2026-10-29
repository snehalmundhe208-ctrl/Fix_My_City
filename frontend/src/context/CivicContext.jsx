import React, { createContext, useContext, useState, useEffect } from 'react';
import { INITIAL_COMPLAINTS, MOCK_OFFICERS, REWARDS_CATALOG } from '../data/mockData';
import confetti from 'canvas-confetti';

const CivicContext = createContext();

export const CivicProvider = ({ children }) => {
  const [complaints, setComplaints] = useState(() => {
    const saved = localStorage.getItem('fixmycity_complaints');
    return saved ? JSON.parse(saved) : INITIAL_COMPLAINTS;
  });

  const [officers, setOfficers] = useState(() => {
    const saved = localStorage.getItem('fixmycity_officers');
    return saved ? JSON.parse(saved) : MOCK_OFFICERS;
  });

  const [rewardPoints, setRewardPoints] = useState(() => {
    const saved = localStorage.getItem('fixmycity_reward_points');
    return saved ? parseInt(saved, 10) : 450;
  });

  const [redeemedRewards, setRedeemedRewards] = useState(() => {
    const saved = localStorage.getItem('fixmycity_redeemed');
    return saved ? JSON.parse(saved) : [];
  });

  const [recentActivities, setRecentActivities] = useState(() => {
    const saved = localStorage.getItem('fixmycity_activities');
    return saved ? JSON.parse(saved) : [
      { id: "act-1", title: "Complaint #CM-8921 updated", subtitle: "Status changed to 'In Progress'", time: "2h ago", type: "status" },
      { id: "act-2", title: "Reward Points Credited", subtitle: "+10 pts for reporting Pothole issue", time: "2h ago", type: "reward" },
      { id: "act-3", title: "Complaint #CM-8910 resolved", subtitle: "Officer Ms. S. Patil marked as resolved", time: "1d ago", type: "resolved" },
      { id: "act-4", title: "Compensation Credited #CM-8890", subtitle: "₹200 credited for SLA delay of 18 hours", time: "3d ago", type: "compensation" }
    ];
  });

  useEffect(() => {
    localStorage.setItem('fixmycity_complaints', JSON.stringify(complaints));
  }, [complaints]);

  useEffect(() => {
    localStorage.setItem('fixmycity_officers', JSON.stringify(officers));
  }, [officers]);

  useEffect(() => {
    localStorage.setItem('fixmycity_reward_points', rewardPoints.toString());
  }, [rewardPoints]);

  useEffect(() => {
    localStorage.setItem('fixmycity_redeemed', JSON.stringify(redeemedRewards));
  }, [redeemedRewards]);

  useEffect(() => {
    localStorage.setItem('fixmycity_activities', JSON.stringify(recentActivities));
  }, [recentActivities]);

  const addComplaint = (newComplaintData) => {
    const nextNum = Math.floor(8925 + Math.random() * 50);
    const newId = `CM-${nextNum}`;

    const newComplaint = {
      id: newId,
      title: newComplaintData.title || `${newComplaintData.category} Issue at ${newComplaintData.location}`,
      category: newComplaintData.category || "Garbage",
      description: newComplaintData.description || "",
      location: newComplaintData.location || "Central Market Road",
      ward: newComplaintData.ward || "Ward 12",
      contact: newComplaintData.contact || "+91 98220 12345",
      status: "Pending",
      urgency: newComplaintData.urgency || "Medium",
      reportedAt: "Just now",
      reportedDate: new Date().toISOString().replace('T', ' ').substring(0, 16),
      citizenName: newComplaintData.citizenName || "Amit Sharma",
      citizenEmail: newComplaintData.citizenEmail || "amit.sharma@example.com",
      department: getDepartmentForCategory(newComplaintData.category),
      assignedOfficer: null,
      upvotes: 1,
      hasUpvoted: true,
      commentsCount: 0,
      comments: [],
      timeline: [
        { step: "Complaint Registered", status: "completed", time: "Just now", desc: "Ticket logged successfully. Auto-routed to department." },
        { step: "Assigned to Ward Officer", status: "pending", time: "Pending", desc: "Awaiting triage." },
        { step: "Field Inspection Completed", status: "pending", time: "Pending", desc: "Inspection pending." },
        { step: "Work in Progress", status: "pending", time: "Pending", desc: "Ground work pending." },
        { step: "Resolved & Verified", status: "pending", time: "Pending", desc: "Resolution pending." }
      ],
      updates: [
        { title: "Complaint created via FixMyCity Portal", time: "Just now", icon: "file-text" }
      ],
      slaDeadline: new Date(Date.now() + 48 * 3600 * 1000).toISOString().replace('T', ' ').substring(0, 16),
      isBreached: false,
      compensationCredited: null,
      imageUrl: newComplaintData.imageUrl || "https://images.unsplash.com/photo-1530587191325-3db32d826c18?auto=format&fit=crop&w=800&q=80"
    };

    setComplaints(prev => [newComplaint, ...prev]);

    // Credit reward points for valid civic report
    setRewardPoints(prev => prev + 15);

    // Log activity
    const newAct = {
      id: `act-${Date.now()}`,
      title: `Complaint #${newId} logged`,
      subtitle: `Category: ${newComplaint.category} (+15 pts awarded)`,
      time: "Just now",
      type: "report"
    };
    setRecentActivities(prev => [newAct, ...prev]);

    return newComplaint;
  };

  const getDepartmentForCategory = (cat) => {
    switch (cat?.toLowerCase()) {
      case 'garbage': return 'Solid Waste Management';
      case 'roads': return 'Roads & Civil Infrastructure';
      case 'drainage': return 'Stormwater Drainage Dept';
      case 'streetlights': return 'Electrical Engineering Dept';
      case 'water supply':
      case 'water': return 'Water Supply & Sewage Board';
      default: return 'Public Works Department';
    }
  };

  const assignOfficerToComplaint = (complaintId, officerId) => {
    const officer = officers.find(o => o.id === officerId) || officers[0];
    
    setComplaints(prev => prev.map(c => {
      if (c.id === complaintId) {
        const updatedTimeline = c.timeline.map(t => {
          if (t.step === "Assigned to Ward Officer") {
            return { ...t, status: "completed", time: "Just now", desc: `Assigned to ${officer.name} (${officer.department})` };
          }
          if (t.step === "Work in Progress" && c.status === "Pending") {
            return { ...t, status: "current", time: "In Progress" };
          }
          return t;
        });

        const newUpdates = [
          { title: `Officer assigned: ${officer.name}`, time: "Just now", icon: "user-check" },
          ...(c.updates || [])
        ];

        return {
          ...c,
          assignedOfficer: {
            name: officer.name,
            phone: officer.phone,
            designation: officer.department,
            assignedAt: "Just now"
          },
          status: c.status === "Pending" ? "In Progress" : c.status,
          timeline: updatedTimeline,
          updates: newUpdates
        };
      }
      return c;
    }));

    // Log activity
    setRecentActivities(prev => [{
      id: `act-${Date.now()}`,
      title: `Complaint #${complaintId} assigned`,
      subtitle: `Officer ${officer.name} assigned`,
      time: "Just now",
      type: "assigned"
    }, ...prev]);
  };

  const updateComplaintStatus = (complaintId, newStatus, note = "") => {
    setComplaints(prev => prev.map(c => {
      if (c.id === complaintId) {
        let updatedTimeline = [...c.timeline];
        if (newStatus === "In Progress") {
          updatedTimeline = updatedTimeline.map(t => {
            if (t.step === "Work in Progress") return { ...t, status: "current", time: "Underway", desc: note || "Work is underway on site." };
            return t;
          });
        } else if (newStatus === "Resolved") {
          updatedTimeline = updatedTimeline.map(t => {
            if (t.step === "Work in Progress") return { ...t, status: "completed" };
            if (t.step === "Resolved & Verified") return { ...t, status: "completed", time: "Just now", desc: note || "Resolution verified by municipal officer." };
            return t;
          });
        }

        const newUpdates = [
          { title: note || `Status updated to ${newStatus}`, time: "Just now", icon: newStatus === "Resolved" ? "check-circle" : "activity" },
          ...(c.updates || [])
        ];

        return {
          ...c,
          status: newStatus,
          timeline: updatedTimeline,
          updates: newUpdates
        };
      }
      return c;
    }));

    setRecentActivities(prev => [{
      id: `act-${Date.now()}`,
      title: `Complaint #${complaintId} updated`,
      subtitle: `Status changed to '${newStatus}'`,
      time: "Just now",
      type: "status"
    }, ...prev]);
  };

  const triggerCompensation = (complaintId, compensationData) => {
    setComplaints(prev => prev.map(c => {
      if (c.id === complaintId) {
        return {
          ...c,
          isBreached: true,
          compensationCredited: {
            amount: compensationData.amount || "₹250",
            type: compensationData.type || "Cash DBT Bank Credit",
            reason: compensationData.reason || "Citizen Charter SLA Deadline Exceeded",
            date: new Date().toISOString().substring(0, 10)
          },
          updates: [
            { title: `Statutory Compensation ${compensationData.amount || "₹250"} credited to Citizen`, time: "Just now", icon: "award" },
            ...(c.updates || [])
          ]
        };
      }
      return c;
    }));

    // Credit 50 bonus civic points as courtesy
    setRewardPoints(prev => prev + 50);

    setRecentActivities(prev => [{
      id: `act-${Date.now()}`,
      title: `Compensation Credited for #${complaintId}`,
      subtitle: `${compensationData.amount || '₹250'} (${compensationData.type || 'Cash'}) credited to Citizen`,
      time: "Just now",
      type: "compensation"
    }, ...prev]);
  };

  const toggleUpvote = (complaintId) => {
    setComplaints(prev => prev.map(c => {
      if (c.id === complaintId) {
        const hasUpvoted = !c.hasUpvoted;
        const upvotes = hasUpvoted ? c.upvotes + 1 : Math.max(0, c.upvotes - 1);
        return { ...c, hasUpvoted, upvotes };
      }
      return c;
    }));
  };

  const addComment = (complaintId, text, userName = "Amit Sharma", isOfficial = false) => {
    const commentObj = {
      id: `c-${Date.now()}`,
      user: userName,
      text,
      time: "Just now",
      isOfficial
    };

    setComplaints(prev => prev.map(c => {
      if (c.id === complaintId) {
        return {
          ...c,
          commentsCount: (c.commentsCount || 0) + 1,
          comments: [...(c.comments || []), commentObj]
        };
      }
      return c;
    }));
  };

  const redeemReward = (reward) => {
    if (rewardPoints < reward.points) {
      return { success: false, message: "Insufficient reward points!" };
    }

    setRewardPoints(prev => prev - reward.points);
    const voucher = {
      id: `claim-${Date.now()}`,
      rewardId: reward.id,
      title: reward.title,
      code: reward.code || `FMC-${Math.floor(1000 + Math.random() * 9000)}`,
      claimedAt: new Date().toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' }),
      pointsSpent: reward.points
    };

    setRedeemedRewards(prev => [voucher, ...prev]);

    // Trigger celebration confetti
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch (e) {
      // ignore
    }

    return { success: true, voucher };
  };

  // Stats calculation
  const totalCount = 12450 + (complaints.length - INITIAL_COMPLAINTS.length);
  const resolvedCount = 9820 + complaints.filter(c => c.status === "Resolved" && !INITIAL_COMPLAINTS.some(ic => ic.id === c.id && ic.status === "Resolved")).length;
  const inProgressCount = complaints.filter(c => c.status === "In Progress").length + 2630 - 2;
  const pendingCount = complaints.filter(c => c.status === "Pending").length;

  const citizenActiveCount = complaints.filter(c => c.citizenEmail === "amit.sharma@example.com" && c.status !== "Resolved").length;
  const citizenResolvedCount = complaints.filter(c => c.citizenEmail === "amit.sharma@example.com" && c.status === "Resolved").length;

  return (
    <CivicContext.Provider
      value={{
        complaints,
        officers,
        rewardPoints,
        redeemedRewards,
        recentActivities,
        addComplaint,
        assignOfficerToComplaint,
        updateComplaintStatus,
        triggerCompensation,
        toggleUpvote,
        addComment,
        redeemReward,
        stats: {
          total: totalCount,
          resolved: resolvedCount,
          inProgress: inProgressCount,
          pending: pendingCount,
          citizenActive: citizenActiveCount,
          citizenResolved: citizenResolvedCount
        }
      }}
    >
      {children}
    </CivicContext.Provider>
  );
};

export const useCivic = () => useContext(CivicContext);
