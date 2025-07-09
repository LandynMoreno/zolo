import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Github, GitCommit, Calendar, TrendingUp } from 'lucide-react';
import Modal from '../shared/Modal';

const GitHubWidget = ({ onApiCall }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const generateCommitData = () => {
    const data = [];
    const today = new Date();
    const daysToShow = 30; // Simple 30 days for 5x6 grid
    
    // Generate data for exactly 30 days
    for (let i = daysToShow - 1; i >= 0; i--) {
      const currentDate = new Date(today);
      currentDate.setDate(today.getDate() - i);
      
      const dayOfWeek = currentDate.getDay();
      const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
      
      let count = 0;
      if (!isWeekend) {
        const random = Math.random();
        if (random < 0.3) count = 0;
        else if (random < 0.6) count = Math.floor(Math.random() * 3) + 1;
        else if (random < 0.85) count = Math.floor(Math.random() * 6) + 4;
        else count = Math.floor(Math.random() * 10) + 10;
      } else {
        if (Math.random() < 0.2) count = Math.floor(Math.random() * 3) + 1;
      }
      
      data.push({
        date: currentDate.toISOString().split('T')[0],
        count,
        level: count === 0 ? 0 : count < 3 ? 1 : count < 6 ? 2 : count < 10 ? 3 : 4,
        dayOfWeek: dayOfWeek
      });
    }
    return data;
  };

  const commitData = generateCommitData();
  const totalCommits = commitData.reduce((sum, day) => sum + day.count, 0);
  const currentStreak = (() => {
    let streak = 0;
    for (let i = commitData.length - 1; i >= 0; i--) {
      if (commitData[i].count > 0) {
        streak++;
      } else {
        break;
      }
    }
    return streak;
  })();

  const recentCommits = [
    {
      id: 1,
      message: 'feat: Add professional communication standards prohibiting emojis',
      sha: 'f1bb0dd',
      date: '2025-07-06',
      files: 3
    },
    {
      id: 2,
      message: 'feat: Implement complete React GUI for Zolo robot with macOS-style navigation',
      sha: '736fb56',
      date: '2025-07-05',
      files: 12
    },
    {
      id: 3,
      message: 'docs: Add comprehensive working modes and clarify branching defaults',
      sha: 'bdc9911',
      date: '2025-07-04',
      files: 2
    },
    {
      id: 4,
      message: 'feat: Add comprehensive git workflow and commit standards',
      sha: 'd3ace74',
      date: '2025-07-03',
      files: 1
    },
    {
      id: 5,
      message: 'refactor: Replace magic numbers with constants in function parameters',
      sha: 'fb5374e',
      date: '2025-07-02',
      files: 8
    }
  ];

  const getIntensityColor = (level) => {
    // GitHub's actual green color scheme
    switch (level) {
      case 0: return 'bg-gray-100 dark:bg-gray-800';
      case 1: return 'bg-green-100 dark:bg-green-900';
      case 2: return 'bg-green-300 dark:bg-green-700';
      case 3: return 'bg-green-500 dark:bg-green-500';
      case 4: return 'bg-green-700 dark:bg-green-300';
      default: return 'bg-gray-100 dark:bg-gray-800';
    }
  };


  const handleViewCommit = (sha) => {
    onApiCall(`Would be calling API_ROUTE="/api/github/commits/${sha}" for viewing commit details`);
  };

  const handleRefreshData = () => {
    onApiCall('Would be calling API_ROUTE="/api/github/activity" for fetching latest GitHub activity');
  };

  return (
    <>
      <div className="card cursor-pointer hover:shadow-lg transition-shadow" onClick={() => setIsModalOpen(true)}>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-semibold">GitHub Activity</h3>
          <div className="flex items-center gap-2">
            <span className="text-sm text-text-light">{totalCommits} commits</span>
            <Github className="w-5 h-5 text-primary-500" />
          </div>
        </div>
        
        <div className="space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <div className="text-center p-2 bg-surface rounded-lg">
              <div className="text-lg font-bold text-green-500">{currentStreak}</div>
              <div className="text-xs text-text-light">Day streak</div>
            </div>
            <div className="text-center p-2 bg-surface rounded-lg">
              <div className="text-lg font-bold text-blue-500">{totalCommits}</div>
              <div className="text-xs text-text-light">Total commits</div>
            </div>
          </div>
          
          <div className="p-3 bg-surface rounded-lg">
            <div className="grid grid-cols-6 gap-1">
              {commitData.map((day, index) => (
                <div
                  key={index}
                  className={`w-6 h-6 rounded-sm ${
                    getIntensityColor(day.level)
                  } hover:ring-1 hover:ring-primary-500 cursor-pointer transition-all`}
                  title={`${day.count} commits on ${day.date}`}
                />
              ))}
            </div>
            <div className="text-xs text-text-light mt-2 text-center">
              Past 30 days
            </div>
          </div>
        </div>
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="GitHub Activity Dashboard"
        size="xl"
      >
        <div className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Stats */}
            <div className="space-y-4">
              <div className="p-4 bg-surface rounded-lg">
                <div className="flex items-center gap-3 mb-3">
                  <TrendingUp className="w-5 h-5 text-green-500" />
                  <h4 className="font-medium">Statistics</h4>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm">Total Commits</span>
                    <span className="font-medium">{totalCommits}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Current Streak</span>
                    <span className="font-medium text-green-500">{currentStreak} days</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">This Week</span>
                    <span className="font-medium">
                      {commitData.slice(-7).reduce((sum, day) => sum + day.count, 0)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">This Month</span>
                    <span className="font-medium">
                      {commitData.slice(-30).reduce((sum, day) => sum + day.count, 0)}
                    </span>
                  </div>
                </div>
                <button
                  onClick={handleRefreshData}
                  className="w-full mt-4 button bg-primary-500 text-white py-2 rounded-lg hover:bg-primary-600"
                >
                  Refresh Data
                </button>
              </div>
            </div>

            {/* Commit Graph */}
            <div className="lg:col-span-2">
              <div className="mb-4">
                <h4 className="font-medium mb-2">Contribution Graph (Past 30 Days)</h4>
                <div className="relative">
                  <div className="p-4 bg-surface rounded-lg">
                    <div className="grid grid-cols-6 gap-2">
                      {commitData.map((day, index) => (
                        <div
                          key={index}
                          className={`w-8 h-8 rounded-sm ${
                            getIntensityColor(day.level)
                          } hover:ring-2 hover:ring-primary-500 cursor-pointer transition-all flex items-center justify-center`}
                          title={`${day.count} commits on ${day.date}`}
                        >
                          <span className="text-xs font-medium text-white/80">
                            {new Date(day.date).getDate()}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center text-xs text-text-light mt-2">
                    <span>Less</span>
                    <div className="flex items-center gap-1">
                      <div className="w-[10px] h-[10px] rounded-sm bg-gray-100 dark:bg-gray-800" />
                      <div className="w-[10px] h-[10px] rounded-sm bg-green-100 dark:bg-green-900" />
                      <div className="w-[10px] h-[10px] rounded-sm bg-green-300 dark:bg-green-700" />
                      <div className="w-[10px] h-[10px] rounded-sm bg-green-500 dark:bg-green-500" />
                      <div className="w-[10px] h-[10px] rounded-sm bg-green-700 dark:bg-green-300" />
                    </div>
                    <span>More</span>
                  </div>
                </div>
              </div>

              {/* Recent Commits */}
              <div>
                <h4 className="font-medium mb-3">Recent Commits</h4>
                <div className="space-y-3">
                  {recentCommits.map(commit => (
                    <motion.div
                      key={commit.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="p-3 border border-border rounded-lg bg-background hover:bg-surface/50 cursor-pointer transition-colors"
                      onClick={() => handleViewCommit(commit.sha)}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <GitCommit className="w-4 h-4 text-text-light" />
                            <span className="text-sm font-mono text-primary-500">{commit.sha}</span>
                          </div>
                          <p className="text-sm font-medium mb-1 leading-tight">
                            {commit.message}
                          </p>
                          <div className="flex items-center gap-3 text-xs text-text-light">
                            <div className="flex items-center gap-1">
                              <Calendar className="w-3 h-3" />
                              {commit.date}
                            </div>
                            <span>{commit.files} files changed</span>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default GitHubWidget;